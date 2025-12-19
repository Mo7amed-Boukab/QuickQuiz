export default function StatCard({ icon: Icon, label, value, bgColor, iconColor }) {
    return (
        <div className="bg-white border border-[#e5e5e5] rounded p-8 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" style={{ color: iconColor }} strokeWidth={2} />
            </div>
            <div className="flex-1">
                <div className="text-3xl font-bold text-[#1a1a1a] leading-none">{value}</div>
                <div className="text-sm text-[#737373] mt-1">{label}</div>
            </div>
        </div>
    );
}
