import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddThemeModal({ isOpen, onClose, onSubmit, themeToEdit }) {
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        if (themeToEdit) {
            setFormData({
                name: themeToEdit.name || '',
            });
        } else {
            setFormData({
                name: '',
            });
        }
    }, [themeToEdit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim()) {
            onSubmit(formData);
            if (!themeToEdit) {
                setFormData({
                    name: '',
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/10">
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="bg-white rounded w-full max-w-2xl relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
                        <div>
                            <h2 className="text-xl font-medium">
                                {themeToEdit ? 'Modifier le thème' : 'Ajouter un nouveau thème'}
                            </h2>
                            <p className="text-sm text-[#737373] mt-1">
                                {themeToEdit ? 'Modifiez les informations du thème' : 'Créez un nouveau thème (Catégorie)'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Nom du Thème
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Web Development"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                                required
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm"
                            >
                                {themeToEdit ? 'Enregistrer' : 'Créer le thème'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
