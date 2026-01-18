import { useState, useEffect } from "react";
import QuestionTable from "../../components/admin/QuestionTable";
import QuestionModal from "../../components/admin/QuestionModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getQuestions, createQuestion, deleteQuestion, updateQuestion } from "../../services/questionService";
import { getQuizzes } from "../../services/quizService";
import { Plus } from "lucide-react";

export default function QuestionsPage() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]); // Changed from themes to quizzes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [questionsData, quizzesData] = await Promise.all([
        getQuestions(),
        getQuizzes()
      ]);

      if (Array.isArray(questionsData)) setQuestions(questionsData);
      else if (questionsData.data && Array.isArray(questionsData.data)) setQuestions(questionsData.data);
      else setQuestions([]);

      const quizList = Array.isArray(quizzesData) ? quizzesData : (quizzesData.data || []);
      setQuizzes(quizList);

      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Edit modal state
  const [questionToEdit, setQuestionToEdit] = useState(null);

  const handleCreateOrUpdateQuestion = async (questionData) => {
    try {
      if (questionToEdit) {
        await updateQuestion(questionToEdit._id, questionData);
      } else {
        await createQuestion(questionData);
      }
      fetchData(); // Refresh list
      setError(null);
      handleCloseModal();
    } catch (err) {
      console.error("Erreur save question:", err);
    }
  };

  const handleEditClick = (question) => {
    setQuestionToEdit(question);
    setIsQuestionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsQuestionModalOpen(false);
    setQuestionToEdit(null);
  };

  const handleDeleteClick = (id) => {
    const question = questions.find(q => q._id === id);
    if (question) {
      setQuestionToDelete(question);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!questionToDelete) return;
    try {
      await deleteQuestion(questionToDelete._id);
      setQuestions(questions.filter(q => q._id !== questionToDelete._id));
      setQuestionToDelete(null);
    } catch (err) {
      console.error("Erreur suppression question:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 max-md:mb-4">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-medium max-md:text-lg">Gestion des Questions</h2>
          <p className="text-sm text-[#737373] mt-1 max-md:text-xs max-md:line-clamp-1">Gérez la banque de questions</p>
        </div>
        <button
          onClick={() => setIsQuestionModalOpen(true)}
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 max-md:p-2 rounded text-sm hover:bg-black transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Question</span>
        </button>
      </div>

      <QuestionTable
        questions={questions}
        quizzes={quizzes} // Renamed prop
        loading={loading}
        error={error}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrUpdateQuestion}
        quizzes={quizzes} // Renamed prop
        questionToEdit={questionToEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer la question"
        message="Êtes-vous sûr de vouloir supprimer cette question ? Cette action est irréversible."
      />
    </>
  );
}
