import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await login(formData);

            // Redirect based on role
            if (response.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
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
            <main className="py-20">
                <div className="max-w-lg mx-auto px-6">
                    <div className="bg-white border border-gray-200 rounded-md p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl text-center font-semibold mb-2">Connexion</h2>
                            <p className="text-gray-600 text-sm text-center mb-10">
                                Connectez-vous à votre compte QuickQuiz pour continuer votre parcours d'apprentissage
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-small mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setError('');
                                    }}
                                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none"
                                    placeholder="Entrez votre email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-small mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            setError('');
                                        }}
                                        className="w-full text-sm px-3 py-2 pr-10 border border-gray-300 rounded focus:outline-none"
                                        placeholder="Entrez votre mot de passe"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    <span className="text-gray-600">Se souvenir de moi</span>
                                </label>
                                <a href="#" className="text-sm hover:underline">
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 bg-black text-white text-sm rounded font-small hover:bg-gray-800 transition-colors"
                            >
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </button>

                            <p className="text-center text-sm text-gray-600 mt-6">
                                Pas encore de compte ?{' '}
                                <Link to="/register" className="text-black font-medium hover:underline">
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
