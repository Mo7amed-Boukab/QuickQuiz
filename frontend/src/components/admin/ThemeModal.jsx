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
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4 max-md:p-0">
                <div className="bg-white rounded w-full max-w-2xl relative max-md:h-full max-md:min-h-screen max-md:rounded-none flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5] sticky top-0 bg-white z-10 max-md:p-4">
                        <div>
                            <h2 className="text-xl font-medium max-md:text-lg">
                                {themeToEdit ? 'Modifier le thème' : 'Ajouter un nouveau thème'}
                            </h2>
                            <p className="text-sm text-[#737373] mt-1 max-md:text-xs">
                                {themeToEdit ? 'Modifiez les informations du thème' : 'Créez un nouveau thème (Catégorie)'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded transition-colors hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <div className="p-6 max-md:p-4 flex-1 overflow-y-auto">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Nom du Thème
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Web Development"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 max-md:h-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e5e5] bg-white sticky bottom-0 z-10 max-md:px-4 max-md:py-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm h-12 max-md:h-9 max-md:text-xs font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm h-12 max-md:h-9 max-md:text-xs font-medium"
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
