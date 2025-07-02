<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Treatment;
use App\Models\Appointment;
use App\Models\Dokter;
use App\Models\JadwalKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        $search = $request->get('search', '');

        $totalDokters = User::where('role', 'dokter')->count();
        $totalPasienApproved = Appointment::where('status', 'disetujui')->count();

        $appointmentsQuery = Appointment::with(['user', 'treatment', 'dokter'])
            ->orderBy('tanggal_submit', 'desc');

        if ($search) {
            $appointmentsQuery->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        $recentAppointments = $appointmentsQuery
            ->take(12)
            ->get()
            ->map(function ($appointment) {
                return [
                    'name' => $appointment->user->name,
                    'age' => $appointment->umur,
                    'treatment' => $appointment->treatment->name,
                    'status' => $appointment->status,
                    'status_color' => $this->getStatusColor($appointment->status),
                ];
            });

        return Inertia::render('Admin/AdminDashboard', [
            'user' => auth()->user(),
            'stats' => [
                'totalDokters' => $totalDokters,
                'totalPasien' => $totalPasienApproved,
            ],
            'recentAppointments' => $recentAppointments,
            'search' => $search,
        ]);
    }

    public function showLogin()
    {
        return Inertia::render('Admin/Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        if (Auth::attempt([
            'email' => $request->username,
            'password' => $request->password,
            'role' => 'admin'
        ], $request->remember)) {
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'username' => 'Kredensial yang diberikan tidak cocok dengan data kami.',
        ]);
    }

    public function dokterGigi(Request $request)
    {
        $search = $request->get('search', '');

        $doktersQuery = User::where('role', 'dokter')
            ->with(['dokter', 'jadwalKerja']);

        if ($search) {
            $doktersQuery->where('name', 'like', '%' . $search . '%');
        }

        $dokters = $doktersQuery->get()
            ->map(function ($user) {
                $jadwalText = $user->jadwalKerja->map(function ($jadwal) {
                    return ucfirst($jadwal->hari) . ': ' . $jadwal->jam_mulai . '-' . $jadwal->jam_selesai . ' WIB';
                })->join(', ');

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'specialization' => $user->dokter->deskripsi ?? 'General Dentist',
                    'schedule' => $jadwalText ?: 'Belum ada jadwal',
                    'image' => $user->dokter->foto_profil ?? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80',
                    'phone' => '081234567890', // Default phone, bisa ditambah ke database
                    'email' => $user->email,
                    'deskripsi' => $user->dokter->deskripsi ?? '',
                    'foto_profil' => $user->dokter->foto_profil ?? '',
                    'jadwal_kerja' => $user->jadwalKerja->map(function ($jadwal) {
                        return [
                            'id' => $jadwal->id,
                            'hari' => $jadwal->hari,
                            'jam_mulai' => $jadwal->jam_mulai,
                            'jam_selesai' => $jadwal->jam_selesai,
                        ];
                    })->toArray()
                ];
            });

        return Inertia::render('Admin/DokterGigi', [
            'dokters' => $dokters,
            'user' => auth()->user(),
            'search' => $search,
        ]);
    }

    public function storeDokter(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'deskripsi' => 'required|string|max:500',
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'jadwal_kerja' => 'nullable|array',
            'jadwal_kerja.*.hari' => 'required|in:senin,selasa,rabu,kamis,jumat,sabtu,minggu',
            'jadwal_kerja.*.jam_mulai' => 'required|date_format:H:i',
            'jadwal_kerja.*.jam_selesai' => 'required|date_format:H:i|after:jadwal_kerja.*.jam_mulai',
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto_profil')) {
            $fotoPath = $request->file('foto_profil')->store('dokter-photos', 'public');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'dokter',
            'email_verified_at' => now(),
        ]);

        Dokter::create([
            'user_id' => $user->id,
            'foto_profil' => $fotoPath ? asset('storage/' . $fotoPath) : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80',
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->has('jadwal_kerja') && is_array($request->jadwal_kerja)) {
            foreach ($request->jadwal_kerja as $jadwal) {
                JadwalKerja::create([
                    'dokter_id' => $user->id,
                    'hari' => $jadwal['hari'],
                    'jam_mulai' => $jadwal['jam_mulai'],
                    'jam_selesai' => $jadwal['jam_selesai'],
                ]);
            }
        }

        return redirect()->route('admin.dokter-gigi')->with('success', 'Dokter berhasil ditambahkan');
    }

    public function updateDokter(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'deskripsi' => 'required|string|max:500',
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'jadwal_kerja' => 'nullable|array',
            'jadwal_kerja.*.hari' => 'required|in:senin,selasa,rabu,kamis,jumat,sabtu,minggu',
            'jadwal_kerja.*.jam_mulai' => 'required|date_format:H:i',
            'jadwal_kerja.*.jam_selesai' => 'required|date_format:H:i|after:jadwal_kerja.*.jam_mulai',
        ]);

        $fotoPath = $user->dokter->foto_profil;
        if ($request->hasFile('foto_profil')) {
            // Delete old photo if exists and not default
            if ($user->dokter->foto_profil && !str_contains($user->dokter->foto_profil, 'unsplash.com')) {
                $oldPath = str_replace(asset('storage/'), '', $user->dokter->foto_profil);
                if (file_exists(storage_path('app/public/' . $oldPath))) {
                    unlink(storage_path('app/public/' . $oldPath));
                }
            }

            $newPath = $request->file('foto_profil')->store('dokter-photos', 'public');
            $fotoPath = asset('storage/' . $newPath);
        }

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->password) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        $user->dokter->update([
            'foto_profil' => $fotoPath,
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->has('jadwal_kerja') && is_array($request->jadwal_kerja)) {
            JadwalKerja::where('dokter_id', $user->id)->delete();
            foreach ($request->jadwal_kerja as $jadwal) {
                JadwalKerja::create([
                    'dokter_id' => $user->id,
                    'hari' => $jadwal['hari'],
                    'jam_mulai' => $jadwal['jam_mulai'],
                    'jam_selesai' => $jadwal['jam_selesai'],
                ]);
            }
        }

        return redirect()->route('admin.dokter-gigi')->with('success', 'Dokter berhasil diperbarui');
    }

    public function deleteDokter($id)
    {
        $user = User::findOrFail($id);

        if ($user->dokter) {
            $user->dokter->delete();
        }
        $user->delete();

        return redirect()->route('admin.dokter-gigi')->with('success', 'Dokter berhasil dihapus');
    }

    public function treatment(Request $request)
    {
        $search = $request->get('search', '');

        $treatmentsQuery = Treatment::orderBy('name');
        if ($search) {
            $treatmentsQuery->where('name', 'like', '%' . $search . '%');
        }

        $treatments = $treatmentsQuery->get();

        return Inertia::render('Admin/Treatment', [
            'treatments' => $treatments,
            'user' => auth()->user(),
            'search' => $search,
        ]);
    }

    public function storeTreatment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|string|max:255',
        ]);

        Treatment::create([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return redirect()->route('admin.treatment')->with('success', 'Treatment berhasil ditambahkan');
    }

    public function updateTreatment(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|string|max:255',
        ]);

        $treatment = Treatment::findOrFail($id);
        $treatment->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return redirect()->route('admin.treatment')->with('success', 'Treatment berhasil diperbarui');
    }

    public function deleteTreatment($id)
    {
        $treatment = Treatment::findOrFail($id);
        $treatment->delete();

        return redirect()->route('admin.treatment')->with('success', 'Treatment berhasil dihapus');
    }

    public function pasien(Request $request)
    {
        $search = $request->get('search', '');

        $appointmentsQuery = Appointment::with(['user', 'treatment', 'dokter'])
            ->orderBy('tanggal_submit', 'desc');

        if ($search) {
            $appointmentsQuery->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        $appointments = $appointmentsQuery->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'tanggal_submit' => $appointment->tanggal_submit->format('d/m/Y'),
                    'nama_pasien' => $appointment->user->name,
                    'umur' => $appointment->umur,
                    'dokter_gigi' => $appointment->dokter ? $appointment->dokter->name : 'Belum ditugaskan',
                    'treatment' => $appointment->treatment->name,
                    'status' => $appointment->status,
                    'status_color' => $this->getStatusColor($appointment->status),
                ];
            });

        $dokters = User::where('role', 'dokter')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Pasien', [
            'pasiens' => $appointments,
            'dokters' => $dokters,
            'user' => auth()->user(),
            'search' => $search,
        ]);
    }

    private function getStatusColor($status)
    {
        return match($status) {
            'disetujui' => 'bg-green-100 text-green-800',
            'ditolak' => 'bg-red-100 text-red-800',
            'diproses' => 'bg-yellow-100 text-yellow-800',
            default => 'bg-yellow-100 text-yellow-800',
        };
    }

    public function assignDokter(Request $request, $id)
    {
        $request->validate([
            'dokter_id' => 'required|integer|exists:users,id',
        ]);

        $appointment = Appointment::findOrFail($id);

        $appointment->update([
            'dokter_id' => $request->dokter_id,
        ]);

        return redirect()->route('admin.pasien')->with('success', 'Dokter berhasil ditugaskan ke pasien');
    }

    public function deletePasien($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return redirect()->route('admin.pasien')->with('success', 'Data pasien berhasil dihapus');
    }

    public function showForgotPassword()
    {
        return Inertia::render('Pasien/Auth/ForgotPassword', [
            'status' => session('status'),
            'role' => 'admin',
            'routePrefix' => 'admin',
        ]);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)
                    ->where('role', 'admin')
                    ->first();

        if (!$user) {
            return back()->withErrors([
                'email' => 'Email tidak ditemukan dalam database kami.',
            ]);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? back()->with(['status' => __($status)])
                    : back()->withErrors(['email' => __($status)]);
    }

    public function showResetPassword(Request $request, $token)
    {
        return Inertia::render('Pasien/Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email,
            'role' => 'admin',
            'routePrefix' => 'admin',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('admin.login')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
}





