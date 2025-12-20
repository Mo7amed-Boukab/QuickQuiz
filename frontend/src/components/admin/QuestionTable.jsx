import { useState } from 'react';
import { Search, Trash2, Edit } from 'lucide-react';

export default function QuestionsTable({ questions = [], themes = [], loading, error, onDelete, onEdit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTheme, setFilterTheme] = useState('all');

    const getThemeName = (themeId) => {
        const theme = themes.find(t => t._id === themeId || t.id === themeId);
        return theme ? theme.name : 'Thème inconnu';
    };

    const handleDelete = (id) => {
        if (onDelete) onDelete(id);
    };

    const filteredQuestions = Array.isArray(questions) ? questions.filter(q => {
        const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTheme = filterTheme === 'all' ||
            (q.theme && (q.theme === filterTheme || q.theme._id === filterTheme));
        return matchesSearch && matchesTheme;
    }) : [];

    if (loading) return <div className="text-center py-4">Chargement...</div>;
    if (error && questions.length === 0) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                    <input
                        type="text"
                        placeholder="Rechercher une question..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded focus:outline-none text-sm"
                    />
                </div>
                <select
                    value={filterTheme}
                    onChange={(e) => setFilterTheme(e.target.value)}
                    className="px-4 py-2 border border-[#e5e5e5] rounded text-sm focus:outline-none bg-white min-w-[200px]"
                >
                    <option value="all">Tous les thèmes</option>
                    {themes.map(theme => (
                        <option key={theme._id || theme.id} value={theme._id || theme.id}>
                            {theme.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f9fafb]">
                            <tr className="border-b border-[#e5e5e5]">
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-20">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Question</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-48">Thème</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-[#737373] w-48">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((q) => (
                                    <tr key={q._id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                        <td className="py-3 px-4 text-sm text-[#737373] font-mono text-xs">
                                            {q._id.substring(q._id.length - 6)}
                                        </td>
                                        <td className="py-3 px-4 text-sm">{q.question}</td>
                                        <td className="py-3 px-4 text-sm text-[#737373]">
                                            {typeof q.theme === 'object' ? q.theme.name : getThemeName(q.theme)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => onEdit && onEdit(q)}
                                                    className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(q._id)}
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
                                    <td colSpan="4" className="py-8 text-center text-gray-500 text-sm">
                                        Aucune question trouvée
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
