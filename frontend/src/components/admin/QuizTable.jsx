import { useState } from 'react';
import { Search, HelpCircle, Variable, Clock, Tag } from 'lucide-react';

export default function QuizTable({ quizzes = [], loading, error, onEdit, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredQuizzes = quizzes.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    if (loading) return <div className="text-center py-4">Chargement...</div>;
    if (error && quizzes.length === 0) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                    <input
                        type="text"
                        placeholder="Rechercher un quiz ou un thème..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded focus:outline-none text-sm"
                    />
                </div>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f9fafb]">
                            <tr className="border-b border-[#e5e5e5]">
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Quiz</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center gap-1">
                                        <Tag className="w-4 h-4" /> Thème
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center justify-center gap-1">
                                        <Variable className="w-4 h-4" /> Difficulté
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center justify-center gap-1">
                                        <Clock className="w-4 h-4" /> Durée
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center justify-center gap-1">
                                        <HelpCircle className="w-4 h-4" /> Questions
                                    </div>
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-med
                                ium text-[#737373]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuizzes.length > 0 ? (
                                filteredQuizzes.map((quiz) => (
                                    <tr key={quiz._id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                        <td className="py-3 px-4 text-sm font-medium">{quiz.title}</td>
                                        <td className="py-3 px-4 text-sm text-[#737373]">{quiz.theme?.name || 'Inconnu'}</td>
                                        <td className="py-3 px-4 text-sm text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                quiz.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {quiz.difficulty === 'Beginner' ? 'Débutant' :
                                                    quiz.difficulty === 'Intermediate' ? 'Intermédiaire' : 'Avancé'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-center text-[#737373]">{quiz.timeLimit} min</td>
                                        <td className="py-3 px-4 text-sm text-center">{quiz.questionCount}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => onEdit && onEdit(quiz)}
                                                    className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => onDelete && onDelete(quiz._id)}
                                                    className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-500 text-sm">
                                        Aucun quiz trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
