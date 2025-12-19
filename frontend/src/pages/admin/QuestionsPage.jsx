import QuizTable from "../../components/admin/QuizTable";
import AddQuestionModal from "../../components/admin/AddQuestionModal";
import { useState } from "react";

export default function QuestionsPage() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [themes] = useState([
    { id: 1, name: "theme 1", questions: 10 },
    { id: 2, name: "theme 2", questions: 15 },
    { id: 3, name: "theme 3", questions: 20 },
  ]);

  const handleAddQuestion = (questionData) => {
    console.log("New question added:", questionData);
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
      <QuizTable />

      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onSubmit={handleAddQuestion}
        themes={themes}
      />
    </>
  );
}
