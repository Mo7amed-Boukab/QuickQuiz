import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logout');
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#e5e5e5]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex items-center justify-between py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            QuickQuiz
                        </span>
                        <span className="px-3 py-1 bg-[#1a1a1a] text-white text-xs font-medium rounded-full">
                            ADMIN
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link to="/" className="px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                            Accueil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
