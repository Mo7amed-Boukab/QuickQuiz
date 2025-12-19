import { useState } from 'react';
import { Search } from 'lucide-react';

export default function QuestionsTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterQuiz, setFilterQuiz] = useState('all');

    const questions = [
        { id: 1, question: 'How do you write "Hello World" in an alert box?', quiz: 'JavaScript Basics' },
        { id: 2, question: 'What is npm?', quiz: 'Node.js' },
        { id: 3, question: 'Which SQL statement is used to extract data from a database?', quiz: 'Database MySQL' }
    ];

    const filteredQuestions = questions.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <select
                    value={filterQuiz}
                    onChange={(e) => setFilterQuiz(e.target.value)}
                    className="px-4 py-2 border border-[#e5e5e5] rounded text-sm focus:outline-none bg-white min-w-[200px]"
                >
                    <option value="all">Tous les quiz</option>
                    <option value="js">JavaScript Basics</option>
                    <option value="node">Node.js</option>
                    <option value="mysql">Database MySQL</option>
                </select>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f9fafb]">
                            <tr className="border-b border-[#e5e5e5]">
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-20">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Questions</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-48">Quiz</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-[#737373] w-48">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.map((q) => (
                                <tr key={q.id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                    <td className="py-3 px-4 text-sm">{q.id}</td>
                                    <td className="py-3 px-4 text-sm">{q.question}</td>
                                    <td className="py-3 px-4 text-sm text-[#737373]">{q.quiz}</td>
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
