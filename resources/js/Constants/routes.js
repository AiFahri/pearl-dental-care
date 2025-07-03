/**
 * Route names constants
 */
export const ROUTES = {
    // Admin routes
    ADMIN: {
        DASHBOARD: 'admin.dashboard',
        DOKTER_GIGI: 'admin.dokter-gigi',
        TREATMENT: 'admin.treatment',
        PASIEN: 'admin.pasien',
        LOGIN: 'admin.login',
    },
    
    // Dokter routes
    DOKTER: {
        DASHBOARD: 'dokter.dashboard',
        APPOINTMENT: 'dokter.appointment',
        LOGIN: 'dokter.login',
    },
    
    // Pasien routes
    PASIEN: {
        DASHBOARD: 'pasien.dashboard',
        LANDING: 'pasien.landing',
        DOKTER: 'pasien.dokter',
        TREATMENT: 'pasien.treatment',
        RESERVASI: 'pasien.reservasi',
        LOGIN: 'pasien.login',
        REGISTER: 'pasien.register',
    },
};

export default ROUTES;
