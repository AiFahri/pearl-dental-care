import { useState } from 'react';
import Button from './Button';

export default function ScheduleForm({ jadwalKerja = [], onChange }) {
    const [schedules, setSchedules] = useState(
        jadwalKerja.length > 0 
            ? jadwalKerja 
            : [{ hari: '', jam_mulai: '', jam_selesai: '' }]
    );

    const hariOptions = [
        { value: 'senin', label: 'Senin' },
        { value: 'selasa', label: 'Selasa' },
        { value: 'rabu', label: 'Rabu' },
        { value: 'kamis', label: 'Kamis' },
        { value: 'jumat', label: 'Jumat' },
        { value: 'sabtu', label: 'Sabtu' },
        { value: 'minggu', label: 'Minggu' },
    ];

    const updateSchedule = (index, field, value) => {
        const newSchedules = [...schedules];
        newSchedules[index] = { ...newSchedules[index], [field]: value };
        setSchedules(newSchedules);
        onChange(newSchedules);
    };

    const addSchedule = () => {
        const newSchedules = [...schedules, { hari: '', jam_mulai: '', jam_selesai: '' }];
        setSchedules(newSchedules);
        onChange(newSchedules);
    };

    const removeSchedule = (index) => {
        if (schedules.length > 1) {
            const newSchedules = schedules.filter((_, i) => i !== index);
            setSchedules(newSchedules);
            onChange(newSchedules);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Jadwal Kerja
                </label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSchedule}
                    className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                    + Tambah Jadwal
                </Button>
            </div>

            <div className="space-y-3">
                {schedules.map((schedule, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                            <select
                                value={schedule.hari}
                                onChange={(e) => updateSchedule(index, 'hari', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            >
                                <option value="">Pilih Hari</option>
                                {hariOptions.map((hari) => (
                                    <option key={hari.value} value={hari.value}>
                                        {hari.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <input
                                type="time"
                                value={schedule.jam_mulai}
                                onChange={(e) => updateSchedule(index, 'jam_mulai', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="time"
                                value={schedule.jam_selesai}
                                onChange={(e) => updateSchedule(index, 'jam_selesai', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        {schedules.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSchedule(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus jadwal"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-xs text-gray-500">
                <p>• Tambahkan jadwal kerja untuk setiap hari yang tersedia</p>
                <p>• Pastikan jam selesai lebih besar dari jam mulai</p>
            </div>
        </div>
    );
}
