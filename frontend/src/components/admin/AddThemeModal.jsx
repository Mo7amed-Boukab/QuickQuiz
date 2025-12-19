import { useState } from 'react';
import { X } from 'lucide-react';

export default function AddThemeModal({ isOpen, onClose, onSubmit }) {
    const [themeName, setThemeName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (themeName.trim()) {
            onSubmit({ name: themeName });
            setThemeName('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded w-full max-w-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
                    <div>
                        <h2 className="text-xl font-medium">Ajouter un nouveau thème</h2>
                        <p className="text-sm text-[#737373] mt-1">Créez un nouveau thème pour vos quiz</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[rgba(0,0,0,0.02)] rounded transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Nom du Thème
                        </label>
                        <input
                            type="text"
                            value={themeName}
                            onChange={(e) => setThemeName(e.target.value)}
                            placeholder="Ex: JavaScript Basics"
                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none rounded text-sm"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm"
                        >
                            Créer le thème
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
