import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

export default function QuestionModal({
    isOpen,
    onClose,
    onSubmit,
    quizzes, // Changed from themes
    questionToEdit
}) {
    const [formData, setFormData] = useState({
        quiz: "", // Changed from theme
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
            // Handle quiz object or id
            const quizId = questionToEdit.quiz ?
                (typeof questionToEdit.quiz === 'object' ? questionToEdit.quiz._id : questionToEdit.quiz)
                : "";

            setFormData({
                quiz: quizId || "",
                question: questionToEdit.question || "",
                answerA: getAnswer(0),
                answerB: getAnswer(1),
                answerC: getAnswer(2),
                answerD: getAnswer(3),
                correctAnswer: correctLetter,
            });
        } else {
            setFormData({
                quiz: "",
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
            quiz: formData.quiz, // Changed from theme
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
            quiz: "",
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
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4 max-md:p-0">
                <div className="bg-white rounded w-full max-w-2xl relative max-md:h-full max-md:min-h-screen max-md:rounded-none flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5] sticky top-0 bg-white z-10 max-md:p-4">
                        <div>
                            <h2 className="text-xl font-medium max-md:text-lg">
                                {questionToEdit ? 'Modifier la question' : 'Ajouter une nouvelle question'}
                            </h2>
                            <p className="text-sm text-[#737373] mt-1 max-md:text-xs">
                                {questionToEdit ? 'Modifiez les informations de la question' : 'Créez une nouvelle question pour vos quiz'}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded transition-colors hover:bg-gray-100">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <div className="p-6 max-md:p-4 flex-1 overflow-y-auto">
                            {/* Quiz Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Quiz</label>
                                <div className="relative">
                                    <select
                                        value={formData.quiz}
                                        onChange={(e) => handleChange("quiz", e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none appearance-none text-sm bg-white h-10 md:h-10"
                                        required
                                    >
                                        <option value="">Sélectionnez un quiz</option>
                                        {quizzes.map((quiz) => (
                                            <option key={quiz._id || quiz.id} value={quiz._id || quiz.id}>
                                                {quiz.title}
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 max-md:h-10"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 max-md:h-10"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 max-md:h-10"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none text-sm h-10 max-md:h-10"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none appearance-none text-sm bg-white h-10 max-md:h-10"
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
                                {questionToEdit ? 'Enregistrer' : 'Créer la question'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
