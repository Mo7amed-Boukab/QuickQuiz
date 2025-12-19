import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Header from '../../components/Header';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        loginIdentifier: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.loginIdentifier || !formData.password) {
            setError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(
                (u) =>
                    (u.email === formData.loginIdentifier || u.username === formData.loginIdentifier) &&
                    u.password === formData.password
            );

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                if (formData.rememberMe) {
                    localStorage.setItem('rememberUser', JSON.stringify(user));
                }
                navigate('/');
            } else {
                setError("Email/nom d'utilisateur ou mot de passe incorrect.");
                setIsLoading(false);
            }
        }, 1000);
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
                            <div>
                                <label htmlFor="loginIdentifier" className="block text-sm font-small mb-2">
                                    Email ou nom d'utilisateur
                                </label>
                                <input
                                    type="text"
                                    id="loginIdentifier"
                                    value={formData.loginIdentifier}
                                    onChange={(e) => {
                                        setFormData({ ...formData, loginIdentifier: e.target.value });
                                        setError('');
                                    }}
                                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none"
                                    placeholder="Entrez votre email ou nom d'utilisateur"
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
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="w-4 h-4 border-gray-300 rounded"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 text-sm font-small text-gray-700">
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <Link to="#" className="text-sm text-black hover:underline">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 bg-black text-white rounded font-small hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <p className="text-gray-600">
                                Pas encore de compte ?{' '}
                                <Link to="/register" className="text-black font-small text-sm hover:underline">
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
