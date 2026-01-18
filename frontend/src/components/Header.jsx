import { useState } from "react";
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

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";
  const isCommonPage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 max-md:px-4">
        {/* DESKTOP HEADER - STRICTLY UNCHANGED */}
        <div className="hidden md:flex items-center justify-between py-4">
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

        {/* MOBILE HEADER - CONTEXT AWARE */}
        <div className="flex md:hidden items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              QuickQuiz
            </span>
            {isAdminRoute && (
              <span className="px-2 py-0.5 text-[10px] bg-[#1a1a1a] text-white font-medium rounded-full">
                ADMIN
              </span>
            )}
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {user ? (
              // LOGGED IN
              isAdminRoute ? (
                // ADMIN MOBILE VIEW: Logout only
                <button
                  onClick={handleLogout}
                  className="p-2 -mr-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              ) : isCommonPage ? (
                // On Home Page -> Show Dashboard Icon
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="p-2 -mr-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
              ) : (
                // On Dashboard/Other Pages -> Show Home Icon (to go back to landing)
                <Link
                  to="/"
                  className="p-2 -mr-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                >
                  <Home className="w-5 h-5" />
                </Link>
              )
            ) : (
              // GUEST (NOT LOGGED IN)
              isLoginPage ? (
                // On Login/Register -> Show Home Icon
                <Link
                  to="/"
                  className="p-2 -mr-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                >
                  <Home className="w-5 h-5" />
                </Link>
              ) : (
                // On Home Page -> Show Login Icon (User)
                <Link
                  to="/login"
                  className="p-2 -mr-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
