export default function DoctorCard({ doctor }) {
    return (
        <div className="rounded-2xl p-4 shadow-sm border-2 border-dashed border-white/50 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                doctor.name
                            )}&background=fed7aa&color=ea580c&size=80`;
                        }}
                    />
                </div>

                <h3 className="font-semibold text-white text-xs mb-1 leading-tight">
                    {doctor.name}
                </h3>

                <p className="font-thin text-xs text-white line-clamp-2">
                    {doctor.specialization}
                </p>
            </div>
        </div>
    );
}
