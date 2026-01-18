import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(formData);

      // Redirect based on role
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Email ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="py-8 md:py-20 min-h-[calc(100vh-56px)] md:min-h-0 flex items-center justify-center md:block">
        <div className="w-full max-w-lg mx-auto px-0 md:px-6">
          <div className="bg-white md:border border-gray-200 rounded p-6 md:p-10 max-md:px-4 max-md:py-6">
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-2xl max-md:text-xl font-bold md:font-semibold mb-2 text-center">
                Connexion
              </h2>
              <p className="text-gray-600 text-base md:text-sm max-md:text-xs text-center mb-6 md:mb-10 max-w-[280px] mx-auto md:max-w-none leading-relaxed">
                Connectez-vous à votre compte QuickQuiz pour continuer votre
                parcours d'apprentissage
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
              {error && (
                <div className="p-3 text-sm max-md:text-xs text-red-500 bg-red-50 border border-red-100 rounded">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm max-md:text-xs font-medium md:font-normal mb-1.5 md:mb-2 text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setError("");
                  }}
                  className="w-full h-12 md:h-auto text-base md:text-sm max-md:h-10 max-md:text-sm px-4 md:px-3 max-md:px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black mobile-input"
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm max-md:text-xs font-medium md:font-normal mb-1.5 md:mb-2 text-gray-700"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setError("");
                    }}
                    className="w-full h-12 md:h-auto text-base md:text-sm max-md:h-10 max-md:text-sm px-4 md:px-3 max-md:px-3 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black mobile-input password-input"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <Eye
                        size={20}
                        className="w-5 h-5 max-md:w-4 max-md:h-4"
                      />
                    ) : (
                      <EyeOff
                        size={20}
                        className="w-5 h-5 max-md:w-4 max-md:h-4"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm max-md:text-xs pt-1 md:pt-0">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 max-md:w-3.5 max-md:h-3.5 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="font-medium hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 md:h-auto text-base md:text-sm max-md:h-11 max-md:text-sm py-2 md:py-2 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors mt-6 md:mt-4 flex items-center justify-center"
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>

              <p className="text-center text-sm max-md:text-xs text-gray-600 mt-6 md:mt-6">
                Pas encore de compte ?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium hover:underline inline-block"
                >
                  S'inscrire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
