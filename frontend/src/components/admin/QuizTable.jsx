import { useState } from 'react';
import { Search, Trophy, Users, HelpCircle } from 'lucide-react';

export default function QuizTable({ stats = [], loading, error }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStats = stats.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center py-4">Chargement...</div>;
    if (error && stats.length === 0) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                    <input
                        type="text"
                        placeholder="Rechercher un quiz..."
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
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center justify-center gap-1">
                                        <HelpCircle className="w-4 h-4" /> Questions
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center justify-center gap-1">
                                        <Trophy className="w-4 h-4" /> Parties Jouées
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373]">
                                    <div className="flex items-center justify-center gap-1">
                                        <Users className="w-4 h-4" /> Joueurs Uniques
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStats.length > 0 ? (
                                filteredStats.map((item) => (
                                    <tr key={item._id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                        <td className="py-3 px-4 text-sm²²²²²²²²²²²²">{item.name}</td>
                                        <td className="py-3 px-4 text-sm text-center">{item.questionCount}</td>
                                        <td className="py-3 px-4 text-sm text-center">{item.playCount}</td>
                                        <td className="py-3 px-4 text-sm text-center">{item.uniqueUsers}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-500 text-sm">
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
