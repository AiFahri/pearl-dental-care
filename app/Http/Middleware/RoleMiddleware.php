<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!auth()->check()) {
            switch ($role) {
                case 'admin':
                    return redirect()->route('admin.login');
                case 'dokter':
                    return redirect()->route('dokter.login');
                case 'pasien':
                    return redirect()->route('pasien.login');
                default:
                    return redirect()->route('pasien.login');
            }
        }

        if (!auth()->user()->hasRole($role)) {
            abort(403, 'Unauthorized access');
        }

        return $next($request);
    }
}
