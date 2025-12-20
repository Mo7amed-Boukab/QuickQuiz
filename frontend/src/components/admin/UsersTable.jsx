import { useState, useEffect } from 'react';
import { Search, Trash2, Edit } from 'lucide-react';
import { getUsers, deleteUser } from '../../services/userService';
import ConfirmationModal from '../common/ConfirmationModal';

export default function UsersTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            // Ensure data is an array
            if (Array.isArray(data)) {
                setUsers(data);
            } else if (data.data && Array.isArray(data.data)) {
                setUsers(data.data);
            } else {
                setUsers([]);
                console.error("Format de données inattendu:", data);
            }
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des utilisateurs');
            console.error(err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await deleteUser(userToDelete._id);
            setUsers(users.filter(user => user._id !== userToDelete._id));
            setUserToDelete(null);
        } catch (err) {
            console.error('Erreur lors de la suppression', err);
        }
    };

    const filteredUsers = Array.isArray(users) ? users.filter(user =>
        user.role !== 'admin' && // Exclude admins
        (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    if (loading) return <div className="text-center py-4">Chargement...</div>;

    if (error && users.length === 0) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                    <input
                        type="text"
                        placeholder="Rechercher un utilisateur..."
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
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-20">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Nom</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">Email</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-32">Role</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-48">Inscrit le</th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373] w-32">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                        <td className="py-3 px-4 text-sm text-[#737373] font-mono text-xs">
                                            {user._id.substring(user._id.length - 6)}
                                        </td>
                                        <td className="py-3 px-4 text-sm">{user.username}</td>
                                        <td className="py-3 px-4 text-sm text-[#737373]">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-900">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-[#737373]">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => handleDeleteClick(user)}
                                                    className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-500 text-sm">
                                        Aucun utilisateur trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Supprimer l'utilisateur"
                message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userToDelete?.username}" ? Cette action est irréversible.`}
            />
        </div>
    );
}
