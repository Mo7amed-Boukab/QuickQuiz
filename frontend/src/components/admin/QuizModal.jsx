import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { getThemes } from "../../services/themeService";

export default function QuizModal({ isOpen, onClose, onSubmit, quizToEdit }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty: "Beginner",
        timeLimit: 10,
        theme: "",
    });

    const [themes, setThemes] = useState([]);
    const [loadingThemes, setLoadingThemes] = useState(false);

    useEffect(() => {
        const fetchThemesList = async () => {
            setLoadingThemes(true);
            try {
                const response = await getThemes();
                const themeList = Array.isArray(response)
                    ? response
                    : response.data || [];
                setThemes(themeList);

                if (!quizToEdit && themeList.length > 0 && !formData.theme) {
                    setFormData(prev => ({ ...prev, theme: themeList[0]._id || themeList[0].id }));
                }
            } catch (error) {
                console.error("Error fetching themes:", error);
            } finally {
                setLoadingThemes(false);
            }
        };

        if (isOpen) {
            fetchThemesList();
        }
    }, [isOpen]);

    useEffect(() => {
        if (quizToEdit) {
            setFormData({
                title: quizToEdit.title || "",
                description: quizToEdit.description || "",
                difficulty: quizToEdit.difficulty || "Beginner",
                timeLimit: quizToEdit.timeLimit || 10,
                theme: quizToEdit.theme ? (quizToEdit.theme._id || quizToEdit.theme) : "",
            });
        } else {
            setFormData({
                title: "",
                description: "",
                difficulty: "Beginner",
                timeLimit: 10,
                theme: themes.length > 0 ? (themes[0]._id || themes[0].id) : "",
            });
        }
    }, [quizToEdit, isOpen, themes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                                {quizToEdit ? "Modifier le quiz" : "Ajouter un quiz"}
                            </h2>
                            <p className="text-sm text-[#737373] mt-1 max-md:text-xs">
                                {quizToEdit
                                    ? "Modifiez les informations du quiz"
                                    : "Créez un nouveau quiz pour vos utilisateurs"}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded transition-colors hover:bg-gray-100">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <div className="p-6 max-md:p-4 flex-1 overflow-y-auto">
                            {/* Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Titre du Quiz
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    placeholder="Ex: HTML Fundamentals"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 md:h-10"
                                    required
                                />
                            </div>

                            {/* Theme Select */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Thème (Catégorie)
                                </label>
                                {loadingThemes ? (
                                    <div className="text-sm text-gray-400">Chargement des thèmes...</div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            value={formData.theme}
                                            onChange={(e) => handleChange("theme", e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none appearance-none text-sm bg-white h-10 md:h-10"
                                            required
                                        >
                                            <option value="" disabled>Sélectionner un thème</option>
                                            {themes.map((theme) => (
                                                <option key={theme._id || theme.id} value={theme._id || theme.id}>
                                                    {theme.name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    placeholder="Une courte description..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none resize-none text-sm"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {/* Difficulty */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Difficulté
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => handleChange("difficulty", e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none appearance-none text-sm bg-white h-10 md:h-10"
                                        >
                                            <option value="Beginner">Débutant</option>
                                            <option value="Intermediate">Intermédiaire</option>
                                            <option value="Advanced">Avancé</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
                                    </div>
                                </div>

                                {/* Time Limit */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Durée (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="180"
                                        value={formData.timeLimit}
                                        onChange={(e) => handleChange("timeLimit", parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 md:h-10"
                                    />
                                </div>
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
                                {quizToEdit ? "Enregistrer" : "Créer le quiz"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
