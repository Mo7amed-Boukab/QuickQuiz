import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Default redirect for new users
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Une erreur est survenue lors de l'inscription.",
      );
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
                Créer un compte
              </h2>
              <p className="text-gray-600 text-base md:text-sm max-md:text-xs text-center mb-6 md:mb-10 max-w-[280px] mx-auto md:max-w-none leading-relaxed">
                Rejoignez QuickQuiz pour suivre vos progrès et rivaliser avec
                d'autres développeurs
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm max-md:text-xs font-medium md:font-small mb-1.5 md:mb-2 text-gray-700"
                >
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    setError("");
                  }}
                  className="w-full h-12 md:h-auto text-base md:text-sm max-md:h-10 max-md:text-sm px-4 md:px-3 max-md:px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black mobile-input"
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm max-md:text-xs font-medium md:font-small mb-1.5 md:mb-2 text-gray-700"
                >
                  Adresse email
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
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm max-md:text-xs font-medium md:font-small mb-1.5 md:mb-2 text-gray-700"
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
                    placeholder="Créez un mot de passe sécurisé"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm hover:text-gray-700"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 max-md:w-4 max-md:h-4" />
                    ) : (
                      <EyeOff className="w-5 h-5 max-md:w-4 max-md:h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm max-md:text-xs font-medium md:font-small mb-1.5 md:mb-2 text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                      setError("");
                    }}
                    className="w-full h-12 md:h-auto text-base md:text-sm max-md:h-10 max-md:text-sm px-4 md:px-3 max-md:px-3 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black mobile-input password-input"
                    placeholder="Confirmez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-5 h-5 max-md:w-4 max-md:h-4" />
                    ) : (
                      <EyeOff className="w-5 h-5 max-md:w-4 max-md:h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        acceptTerms: e.target.checked,
                      });
                      setError("");
                    }}
                    className="w-4 h-4 max-md:w-3.5 max-md:h-3.5 mt-0.5 border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="ml-2 text-sm max-md:text-xs text-gray-700"
                  >
                    J'accepte les{" "}
                    <Link to="#" className="text-black hover:underline">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link to="#" className="text-black hover:underline">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-sm max-md:text-xs text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 md:h-auto text-base md:text-sm max-md:h-11 max-md:text-sm py-2 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors mt-6 md:mt-4 flex items-center justify-center"
              >
                {isLoading ? "Création du compte..." : "Créer mon compte"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm max-md:text-xs">
              <p className="text-gray-600">
                Déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="text-black font-medium hover:underline inline-block"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
