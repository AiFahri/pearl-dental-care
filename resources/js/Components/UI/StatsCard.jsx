import icPasien from "../../../assets/ic-pasien.svg";
import icDokter from "../../../assets/ic-dokter.svg";

export default function StatsCard({
    icon,
    value,
    label,
    bgColor = "bg-tertiary",
    borderColor = "border-orange-100",
    className = "",
}) {
    return (
        <div
            className={`${bgColor} rounded-2xl p-6 border ${borderColor} ${className}`}
        >
            <div className="flex items-center gap-4">
                <div className="w-24 rounded-xl flex items-center justify-center">
                    {icon === "👨‍⚕️" ? (
                        <img src={icDokter} alt="Dokter" className="w-" />
                    ) : (
                        <img src={icPasien} alt="Pasien" className="w" />
                    )}
                </div>
                <div>
                    <div className="text-3xl font-bold text-gray-800">
                        {value}
                    </div>
                    <div className="text-sm text-gray-600">{label}</div>
                </div>
            </div>
        </div>
    );
}
