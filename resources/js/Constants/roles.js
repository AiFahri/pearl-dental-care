/**
 * User roles constants
 */
export const USER_ROLES = {
    ADMIN: 'admin',
    DOKTER: 'dokter',
    PASIEN: 'pasien',
};

/**
 * Role display names
 */
export const ROLE_LABELS = {
    [USER_ROLES.ADMIN]: 'Administrator',
    [USER_ROLES.DOKTER]: 'Dokter Gigi',
    [USER_ROLES.PASIEN]: 'Pasien',
};

export default USER_ROLES;
