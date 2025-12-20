import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

export default function QuestionModal({
    isOpen,
    onClose,
    onSubmit,
    themes,
    questionToEdit
}) {
    const [formData, setFormData] = useState({
        theme: "",
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        correctAnswer: "",
    });

    useEffect(() => {
        if (questionToEdit) {
            const getAnswer = (idx) => questionToEdit.options && questionToEdit.options[idx] ? questionToEdit.options[idx].text : '';
            const correctIndex = questionToEdit.options ? questionToEdit.options.findIndex(o => o.isCorrect) : -1;
            const correctLetter = correctIndex >= 0 ? ['A', 'B', 'C', 'D'][correctIndex] : '';
            const themeId = typeof questionToEdit.theme === 'object' ? questionToEdit.theme._id : questionToEdit.theme;

            setFormData({
                theme: themeId || "",
                question: questionToEdit.question || "",
                answerA: getAnswer(0),
                answerB: getAnswer(1),
                answerC: getAnswer(2),
                answerD: getAnswer(3),
                correctAnswer: correctLetter,
            });
        } else {
            setFormData({
                theme: "",
                question: "",
                answerA: "",
                answerB: "",
                answerC: "",
                answerD: "",
                correctAnswer: "",
            });
        }
    }, [questionToEdit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            theme: formData.theme,
            question: formData.question,
            options: [
                { text: formData.answerA, isCorrect: formData.correctAnswer === 'A' },
                { text: formData.answerB, isCorrect: formData.correctAnswer === 'B' },
                { text: formData.answerC, isCorrect: formData.correctAnswer === 'C' },
                { text: formData.answerD, isCorrect: formData.correctAnswer === 'D' }
            ]
        };

        onSubmit(payload);
        setFormData({
            theme: "",
            question: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            correctAnswer: "",
        });
        onClose();
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
                                {questionToEdit ? 'Modifier la question' : 'Ajouter une nouvelle question'}
                            </h2>
                            <p className="text-sm text-[#737373] mt-1">
                                {questionToEdit ? 'Modifiez les informations de la question' : 'Créez une nouvelle question pour vos quiz'}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Theme Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Thème</label>
                            <div className="relative">
                                <select
                                    value={formData.theme}
                                    onChange={(e) => handleChange("theme", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none appearance-none text-sm bg-white"
                                    required
                                >
                                    <option value="">Sélectionnez un thème</option>
                                    {themes.map((theme) => (
                                        <option key={theme._id || theme.id} value={theme._id || theme.id}>
                                            {theme.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Question</label>
                            <textarea
                                value={formData.question}
                                onChange={(e) => handleChange("question", e.target.value)}
                                placeholder="Entrez votre question..."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none resize-none text-sm"
                                required
                            />
                        </div>

                        {/* Answers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Réponse A
                                </label>
                                <input
                                    type="text"
                                    value={formData.answerA}
                                    onChange={(e) => handleChange("answerA", e.target.value)}
                                    placeholder="Première réponse"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Réponse B
                                </label>
                                <input
                                    type="text"
                                    value={formData.answerB}
                                    onChange={(e) => handleChange("answerB", e.target.value)}
                                    placeholder="Deuxième réponse"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Réponse C
                                </label>
                                <input
                                    type="text"
                                    value={formData.answerC}
                                    onChange={(e) => handleChange("answerC", e.target.value)}
                                    placeholder="Troisième réponse"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Réponse D
                                </label>
                                <input
                                    type="text"
                                    value={formData.answerD}
                                    onChange={(e) => handleChange("answerD", e.target.value)}
                                    placeholder="Quatrième réponse"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Correct Answer */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Bonne Réponse
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.correctAnswer}
                                    onChange={(e) =>
                                        handleChange("correctAnswer", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none appearance-none text-sm bg-white"
                                    required
                                >
                                    <option value="">Sélectionner la bonne réponse</option>
                                    <option value="A">Réponse A</option>
                                    <option value="B">Réponse B</option>
                                    <option value="C">Réponse C</option>
                                    <option value="D">Réponse D</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
                            </div>
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
                                {questionToEdit ? 'Enregistrer' : 'Créer la question'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
