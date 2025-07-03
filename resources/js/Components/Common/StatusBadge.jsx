import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '@/Constants';

/**
 * StatusBadge component for displaying appointment status
 * @param {string} status - Appointment status
 * @param {string} className - Additional CSS classes
 */
export default function StatusBadge({ status, className = "" }) {
    const statusConfig = STATUS_COLORS[status] || STATUS_COLORS.diproses;
    const label = STATUS_LABELS[status] || STATUS_LABELS.diproses;

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.badge} ${className}`}
        >
            {label}
        </span>
    );
}
