import { useState, useEffect } from "react";
import QuestionTable from "../../components/admin/QuestionTable";
import QuestionModal from "../../components/admin/QuestionModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getQuestions, createQuestion, deleteQuestion, updateQuestion } from "../../services/questionService";
import { getThemes } from "../../services/themeService";

export default function QuestionsPage() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [questionsData, themesData] = await Promise.all([
        getQuestions(),
        getThemes()
      ]);

      if (Array.isArray(questionsData)) setQuestions(questionsData);
      else if (questionsData.data && Array.isArray(questionsData.data)) setQuestions(questionsData.data);
      else setQuestions([]);

      if (Array.isArray(themesData)) setThemes(themesData);
      else if (themesData.data && Array.isArray(themesData.data)) setThemes(themesData.data);
      else setThemes([]);

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Gestion des Questions</h2>
        <button
          onClick={() => setIsQuestionModalOpen(true)}
          className="px-4 py-2 bg-[#1a1a1a] text-white rounded text-sm hover:bg-[#000] transition-colors"
        >
          + Nouvelle Question
        </button>
      </div>

      <QuestionTable
        questions={questions}
        themes={themes}
        loading={loading}
        error={error}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrUpdateQuestion}
        themes={themes}
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
