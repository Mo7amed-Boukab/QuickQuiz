import { Outlet, Link, useLocation } from "react-router-dom";
import { Users, FileText, HelpCircle, Tag } from "lucide-react";
import Header from "../../components/Header";
import StatCard from "../../components/admin/StatCard";

export default function AdminDashboard() {
  const location = useLocation();
  const currentPath = location.pathname;

  const stats = [
    {
      icon: Users,
      label: "Utilisateurs",
      value: "11",
      bgColor: "bg-[rgba(59,130,246,0.1)]",
      iconColor: "#0a1e3eff",
    },
    {
      icon: FileText,
      label: "Quiz",
      value: "5",
      bgColor: "bg-[rgba(234,179,8,0.1)]",
      iconColor: "#674e03ff",
    },
    {
      icon: HelpCircle,
      label: "Questions",
      value: "22",
      bgColor: "bg-[rgba(107,114,128,0.1)]",
      iconColor: "#1f2937",
    },
    {
      icon: Tag,
      label: "Thèmes",
      value: "5",
      bgColor: "bg-[rgba(239,68,68,0.1)]",
      iconColor: "#991b1b",
    },
  ];

  const tabs = [
    { path: "/admin/questions", label: "Questions" },
    { path: "/admin/themes", label: "Thèmes" },
    { path: "/admin/users", label: "Utilisateurs" },
    { path: "/admin/history", label: "Historique Utilisateurs" },
    { path: "/admin/export", label: "Export" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              bgColor={stat.bgColor}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white overflow-hidden">
          <div className="border-b border-[#e5e5e5]">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`py-2 px-4 text-sm border-b-2 transition-colors ${
                    currentPath === tab.path
                      ? "border-[#1a1a1a] text-[#1a1a1a]"
                      : "border-transparent text-[#737373] hover:text-[#1a1a1a]"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
