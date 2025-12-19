import { useState } from 'react';
import { Search } from 'lucide-react';

export default function ThemesTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTheme, setFilterTheme] = useState('all');

    const themes = [
        { id: 1, name: 'theme 1', questions: 10 },
        { id: 2, name: 'theme 2', questions: 15 },
        { id: 3, name: 'theme 3', questions: 20 }
    ];

    const filteredThemes = themes.filter(theme =>
        theme.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                    <input
                        type="text"
                        placeholder="Rechercher un theme..."
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
                    <option value="theme1">Theme 1</option>
                    <option value="theme2">Theme 2</option>
                    <option value="theme3">Theme 3</option>
                </select>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f9fafb]">
                            <tr className="border-b border-[#e5e5e5]">
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-20">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Nom</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-56">Number of Questions</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-[#737373] w-48">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredThemes.map((theme) => (
                                <tr key={theme.id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                    <td className="py-3 px-4 text-sm">{theme.id}</td>
                                    <td className="py-3 px-4 text-sm">{theme.name}</td>
                                    <td className="py-3 px-4 text-sm text-[#737373]">{theme.questions}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2 justify-end">
                                            <button className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                                Modifier
                                            </button>
                                            <button className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
