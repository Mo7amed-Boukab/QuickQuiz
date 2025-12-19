
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const currentUser = "mohamed";
    const handleLogout = () => {
        console.log('Logout');
        navigate('/login');
    };
    return (
     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between py-4">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                QuickQuiz
                            </span>
                        </Link>
                        <div className="flex items-center gap-3">
                            {currentUser ? (
                                <>
                                    <span className="text-sm text-gray-700">Welcome, mohamed!</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800 transition-colors">
                                        Register
                                    </Link>
                                </>
                            )}
                            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
  )
}

export default Header