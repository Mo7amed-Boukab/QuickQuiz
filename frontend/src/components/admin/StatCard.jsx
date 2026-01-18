export default function StatCard({ icon: Icon, label, value, bgColor, iconColor }) {
    return (
        <div className="bg-white border border-[#e5e5e5] rounded p-8 max-md:p-4 flex items-center gap-4 max-md:gap-3 h-full">
            <div className={`w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 max-md:w-5 max-md:h-5" style={{ color: iconColor }} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-3xl max-md:text-2xl font-bold text-[#1a1a1a] leading-none truncate">{value}</div>
                <div className="text-sm max-md:text-xs text-[#737373] mt-1 truncate">{label}</div>
            </div>
        </div>
    );
}
