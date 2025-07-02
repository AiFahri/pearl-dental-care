<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Appointment;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

class DokterController extends Controller
{
    public function dashboard(Request $request)
    {
        $dokterId = auth()->id();
        $search = $request->get('search', '');

        $stats = [
            'totalDokters' => User::where('role', 'dokter')->count(),
            'totalPasien' => Appointment::where('status', 'disetujui')->count(),
        ];

        $appointmentsQuery = Appointment::with(['user', 'treatment'])
            ->where('dokter_id', $dokterId);

        if ($search) {
            $appointmentsQuery->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        $assignedAppointments = $appointmentsQuery
            ->orderBy('tanggal_submit', 'desc')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'nama_pasien' => $appointment->user->name,
                    'umur' => $appointment->umur,
                    'treatment' => $appointment->treatment->name,
                    'waktu_submit' => $appointment->tanggal_submit->format('d M Y H:i'),
                    'status' => $appointment->status,
                    'status_color' => $this->getStatusColor($appointment->status),
                ];
            });

        return Inertia::render('Dokter/Dashboard', [
            'user' => auth()->user(),
            'stats' => $stats,
            'assignedAppointments' => $assignedAppointments,
            'search' => $search,
        ]);
    }

    private function getStatusColor($status)
    {
        switch ($status) {
            case 'disetujui':
                return 'bg-green-50 border-green-200';
            case 'ditolak':
                return 'bg-red-50 border-red-200';
            case 'diproses':
            default:
                return 'bg-yellow-50 border-yellow-200';
        }
    }

    public function showLogin()
    {
        return Inertia::render('Dokter/Auth/Login');
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
            'role' => 'dokter'
        ], $request->remember)) {
            $request->session()->regenerate();
            return redirect()->route('dokter.dashboard');
        }

        return back()->withErrors([
            'username' => 'Kredensial yang diberikan tidak cocok dengan data kami.',
        ]);
    }

    public function appointment(Request $request)
    {
        $dokterId = auth()->id();
        $search = $request->get('search', '');

        $appointmentsQuery = Appointment::with(['user', 'treatment'])
            ->where('dokter_id', $dokterId);

        if ($search) {
            $appointmentsQuery->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        $appointments = $appointmentsQuery
            ->orderBy('tanggal_submit', 'desc')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'patient_name' => $appointment->user->name,
                    'age' => $appointment->umur,
                    'treatment' => $appointment->treatment->name,
                    'status' => $appointment->status,
                    'tanggal_submit' => $appointment->tanggal_submit->format('d M Y H:i'),
                    'waktu_disetujui' => $appointment->waktu_disetujui ? $appointment->waktu_disetujui->format('d M Y H:i') : null,
                ];
            });

        return Inertia::render('Dokter/Appointment', [
            'appointments' => $appointments,
            'user' => auth()->user(),
            'search' => $search,
        ]);
    }

    public function approveAppointment(Request $request, $id)
    {
        $appointment = Appointment::with(['user', 'treatment'])->findOrFail($id);

        if ($appointment->dokter_id !== auth()->id()) {
            return redirect()->route('dokter.appointment')->with('error', 'Anda tidak memiliki akses untuk appointment ini');
        }

        if ($appointment->status !== 'diproses') {
            return redirect()->route('dokter.appointment')->with('error', 'Appointment sudah diproses sebelumnya');
        }

        $waktuDisetujui = now()->addMinutes(30);

        $appointment->update([
            'status' => 'disetujui',
            'waktu_disetujui' => $waktuDisetujui,
        ]);

        return redirect()->route('dokter.appointment')->with('success',
            'Appointment berhasil disetujui. Pasien akan diberitahu jadwal pemeriksaan pada ' .
            $waktuDisetujui->format('d M Y \p\u\k\u\l H:i') . ' WIB'
        );
    }

    public function rejectAppointment(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string|max:500'
        ]);

        $appointment = Appointment::with(['user', 'treatment'])->findOrFail($id);

        if ($appointment->dokter_id !== auth()->id()) {
            return redirect()->route('dokter.appointment')->with('error', 'Anda tidak memiliki akses untuk appointment ini');
        }

        if ($appointment->status !== 'diproses') {
            return redirect()->route('dokter.appointment')->with('error', 'Appointment sudah diproses sebelumnya');
        }

        $appointment->update([
            'status' => 'ditolak',
        ]);

        $dokterName = auth()->user()->name;

        return redirect()->route('dokter.appointment')->with('success',
            'Appointment berhasil ditolak. Pasien akan diberitahu untuk mengajukan reservasi ulang.'
        );
    }

    public function showForgotPassword()
    {
        return Inertia::render('Pasien/Auth/ForgotPassword', [
            'status' => session('status'),
            'role' => 'dokter',
            'routePrefix' => 'dokter',
        ]);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)
                    ->where('role', 'dokter')
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
            'role' => 'dokter',
            'routePrefix' => 'dokter',
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
                    ? redirect()->route('dokter.login')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
}




