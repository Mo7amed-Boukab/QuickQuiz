import { useState, useEffect } from "react";
import QuizTable from "../../components/admin/QuizTable";
import QuizModal from "../../components/admin/QuizModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from "../../services/quizService";
import { Plus } from "lucide-react";

export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizToEdit, setQuizToEdit] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const response = await getQuizzes();
            // Handle { success: true, data: [...] } or [...]
            const data = response.data || response;
            if (Array.isArray(data)) {
                setQuizzes(data);
            } else if (response.success && Array.isArray(response.data)) {
                setQuizzes(response.data);
            } else {
                setQuizzes([]);
            }
        } catch (err) {
            setError("Impossible de charger les quiz");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Create / Update Handler
    const handleCreateOrUpdateQuiz = async (quizData) => {
        try {
            if (quizToEdit) {
                await updateQuiz(quizToEdit._id, quizData);
            } else {
                await createQuiz(quizData);
            }
            fetchQuizzes();
            handleCloseModal();
        } catch (err) {
            console.error("Error saving quiz:", err);
        }
    };

    // Delete Handler
    const handleDeleteQuiz = async () => {
        if (!quizToDelete) return;
        try {
            await deleteQuiz(quizToDelete);
            fetchQuizzes();
            setIsDeleteModalOpen(false);
            setQuizToDelete(null);
        } catch (err) {
            console.error("Error deleting quiz:", err);
        }
    };

    // Modal Helpers
    const handleOpenCreateModal = () => {
        setQuizToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (quiz) => {
        setQuizToEdit(quiz);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setQuizToEdit(null);
    };

    const handleOpenDeleteModal = (id) => {
        setQuizToDelete(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6 max-md:mb-4">
                <div className="flex-1 pr-4">
                    <h2 className="text-xl font-medium max-md:text-lg">Gestion des Quiz</h2>
                    <p className="text-sm text-[#737373] mt-1 max-md:text-xs max-md:line-clamp-1">Créez et gérez vos quiz (HTML, CSS, JS...)</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 max-md:p-2 rounded text-sm hover:bg-black transition-colors shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>Nouveau Quiz</span>
                </button>
            </div>

            <QuizTable
                quizzes={quizzes}
                loading={loading}
                error={error}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
            />

            <QuizModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateOrUpdateQuiz}
                quizToEdit={quizToEdit}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteQuiz}
                title="Supprimer le quiz ?"
                message="Êtes-vous sûr de vouloir supprimer ce quiz ? Cette action est irréversible et supprimera toutes les questions associées."
            />
        </>
    );
}
