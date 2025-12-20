import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isOnDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              QuickQuiz
            </span>
            {isAdminRoute && (
              <span className="px-3 py-1 bg-[#1a1a1a] text-white text-xs font-medium rounded-full">
                ADMIN
              </span>
            )}
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {isOnDashboard ? (
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                ) : (
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
