import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Play, BookOpen, Trophy, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const BottomNavigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const navItems = [
        { path: "/dashboard", icon: Home, label: "Accueil" },
        { path: "/quizlist", icon: Play, label: "Quiz" },
        { path: "/practice", icon: BookOpen, label: "Pratique" },
        { path: "/achievements", icon: Trophy, label: "Badges" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
            <div className="flex items-center justify-around h-16 px-2 safe-area-bottom">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-lg transition-colors ${isActive(item.path)
                                ? "text-black"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <item.icon
                            className={`w-5 h-5 ${isActive(item.path) ? "stroke-[2.5]" : ""}`}
                        />
                        <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
                    </Link>
                ))}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[10px] mt-0.5 font-medium">Sortir</span>
                </button>
            </div>
        </nav>
    );
};

export default BottomNavigation;
