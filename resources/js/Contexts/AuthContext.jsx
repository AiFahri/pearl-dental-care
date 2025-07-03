import React, { createContext, useContext } from 'react';
import { USER_ROLES } from '@/Constants';

const AuthContext = createContext();

/**
 * Auth Context Provider
 * Provides authentication state and user information
 */
export function AuthProvider({ children, user = null }) {
    const isAuthenticated = !!user;
    const userRole = user?.role;
    
    const isAdmin = userRole === USER_ROLES.ADMIN;
    const isDokter = userRole === USER_ROLES.DOKTER;
    const isPasien = userRole === USER_ROLES.PASIEN;
    
    const value = {
        user,
        isAuthenticated,
        userRole,
        isAdmin,
        isDokter,
        isPasien,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to use auth context
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
