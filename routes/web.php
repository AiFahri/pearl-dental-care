<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\PasienController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PasienController::class, 'landing'])->name('landing');

Route::get('/dashboard', function () {
    if (auth()->check()) {
        $user = auth()->user();

        switch ($user->role) {
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'dokter':
                return redirect()->route('dokter.dashboard');
            case 'pasien':
                return redirect()->route('pasien.dashboard');
            default:
                return redirect()->route('login');
        }
    }

    return redirect()->route('pasien.login');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes
Route::prefix('admin')->name('admin.')->middleware('role.session:admin')->group(function () {
    Route::get('/login', [AdminController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminController::class, 'login'])->name('login.post');
    Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/dokter-gigi', [AdminController::class, 'dokterGigi'])->name('dokter-gigi');
        Route::post('/dokter-gigi', [AdminController::class, 'storeDokter'])->name('dokter-gigi.store');
        Route::put('/dokter-gigi/{id}', [AdminController::class, 'updateDokter'])->name('dokter-gigi.update');
        Route::delete('/dokter-gigi/{id}', [AdminController::class, 'deleteDokter'])->name('dokter-gigi.delete');

        Route::get('/treatment', [AdminController::class, 'treatment'])->name('treatment');
        Route::post('/treatment', [AdminController::class, 'storeTreatment'])->name('treatment.store');
        Route::put('/treatment/{id}', [AdminController::class, 'updateTreatment'])->name('treatment.update');
        Route::delete('/treatment/{id}', [AdminController::class, 'deleteTreatment'])->name('treatment.delete');

        Route::get('/pasien', [AdminController::class, 'pasien'])->name('pasien');
        Route::put('/pasien/{id}/assign-dokter', [AdminController::class, 'assignDokter'])->name('pasien.assign-dokter');
        Route::delete('/pasien/{id}', [AdminController::class, 'deletePasien'])->name('pasien.delete');
    });
});

// Dokter Routes
Route::prefix('dokter')->name('dokter.')->middleware('role.session:dokter')->group(function () {
    Route::get('/login', [DokterController::class, 'showLogin'])->name('login');
    Route::post('/login', [DokterController::class, 'login'])->name('login.post');
    Route::middleware(['auth', 'verified', 'role:dokter'])->group(function () {
        Route::get('/dashboard', [DokterController::class, 'dashboard'])->name('dashboard');
        Route::get('/appointment', [DokterController::class, 'appointment'])->name('appointment');
        Route::post('/appointment/{id}/approve', [DokterController::class, 'approveAppointment'])->name('appointment.approve');
        Route::post('/appointment/{id}/reject', [DokterController::class, 'rejectAppointment'])->name('appointment.reject');
    });
});

// Pasien Routes
Route::prefix('pasien')->name('pasien.')->middleware('role.session:pasien')->group(function () {
    Route::get('/login', [PasienController::class, 'showLogin'])->name('login');
    Route::post('/login', [PasienController::class, 'login'])->name('login.post');
    Route::get('/register', [PasienController::class, 'showRegister'])->name('register');
    Route::post('/register', [PasienController::class, 'register'])->name('register.post');
    Route::get('/dokter', [PasienController::class, 'dokter'])->name('dokter');
    Route::get('/treatment', [PasienController::class, 'treatment'])->name('treatment');
    Route::get('/reservasi', [PasienController::class, 'reservasi'])->name('reservasi');
    Route::post('/reservasi', [PasienController::class, 'submitReservasi'])->name('reservasi.submit');

    Route::middleware(['auth', 'verified', 'role:pasien'])->group(function () {
        Route::get('/dashboard', [PasienController::class, 'dashboard'])->name('dashboard');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

require __DIR__.'/auth.php';
