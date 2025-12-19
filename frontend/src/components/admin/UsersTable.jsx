import { useState } from 'react';
import { Search } from 'lucide-react';

export default function UsersTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const users = [
        { id: 1, name: 'yasine', email: 'yasine@gmail.com', role: 'user', joinedAt: '01/11/2025' },
        { id: 2, name: 'mohamed', email: 'mohamed@gmail.com', role: 'User', joinedAt: '01/11/2025' },
        { id: 3, name: 'zaid', email: 'zaid@gmail.com', role: 'User', joinedAt: '01/11/2025' }
    ];

    const filteredUsers = users.filter(user =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase())
    );

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
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 border border-[#e5e5e5] rounded text-sm focus:outline-none bg-white min-w-[200px]"
                >
                    <option value="all">Tous les rôles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f9fafb]">
                            <tr className="border-b border-[#e5e5e5]">
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-20">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Nom</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Email</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-32">Role</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-32">Inscrit le</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-[#737373] w-48">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                    <td className="py-3 px-4 text-sm">{user.id}</td>
                                    <td className="py-3 px-4 text-sm">{user.name}</td>
                                    <td className="py-3 px-4 text-sm text-[#737373]">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-900">
                                            {user.role} 
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#737373]">{user.joinedAt}</td>
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
