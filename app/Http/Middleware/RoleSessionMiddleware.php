<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleSessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $expectedRole): Response
    {
        if (auth()->check() && auth()->user()->role !== $expectedRole) {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            switch ($expectedRole) {
                case 'admin':
                    return redirect()->route('admin.login')->with('message', 'Silakan login sebagai admin.');
                case 'dokter':
                    return redirect()->route('dokter.login')->with('message', 'Silakan login sebagai dokter.');
                case 'pasien':
                    return redirect()->route('pasien.login')->with('message', 'Silakan login sebagai pasien.');
                default:
                    return redirect()->route('pasien.login');
            }
        }

        return $next($request);
    }
}
