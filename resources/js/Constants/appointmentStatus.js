/**
 * Appointment status constants
 */
export const APPOINTMENT_STATUS = {
    DIPROSES: 'diproses',
    DISETUJUI: 'disetujui',
    DITOLAK: 'ditolak',
};

/**
 * Status display labels
 */
export const STATUS_LABELS = {
    [APPOINTMENT_STATUS.DIPROSES]: 'Menunggu',
    [APPOINTMENT_STATUS.DISETUJUI]: 'Disetujui',
    [APPOINTMENT_STATUS.DITOLAK]: 'Ditolak',
};

/**
 * Status colors for UI
 */
export const STATUS_COLORS = {
    [APPOINTMENT_STATUS.DIPROSES]: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800',
    },
    [APPOINTMENT_STATUS.DISETUJUI]: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        badge: 'bg-green-100 text-green-800',
    },
    [APPOINTMENT_STATUS.DITOLAK]: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-800',
    },
};

export default APPOINTMENT_STATUS;
