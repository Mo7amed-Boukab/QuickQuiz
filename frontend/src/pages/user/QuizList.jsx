import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/common/BottomNavigation";
import Loader from "../../components/common/Loader";
import { getQuizzes } from "../../services/quizService";

const QuizList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await getQuizzes();
        const data = response.data || response;
        setQuizzes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "from-yellow-500 to-orange-500";
      case "Intermediate":
        return "from-blue-500 to-cyan-400";
      case "Advanced":
        return "from-orange-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const startQuiz = (quiz) => {
    localStorage.setItem("selectedQuizId", quiz._id);
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <>
      <Header />
      <section id="quizzes" className="py-8 md:py-20 bg-gray-50 min-h-screen pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-semibold mb-2 md:mb-4">
              Choose Your Challenge
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Select a quiz that matches your skill level and start improving
              your web development expertise today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto pb-4">
            {loading ? (
              <div className="col-span-full flex justify-center">
                <Loader text="Chargement des quiz..." />
              </div>
            ) : quizzes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-600">
                Aucun quiz disponible
              </div>
            ) : (
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  onClick={() => startQuiz(quiz)}
                  className="bg-white border border-gray-200 rounded hover:shadow-lg transition-all cursor-pointer group overflow-hidden active:bg-gray-50"
                >
                  <div
                    className={`h-1 bg-gradient-to-r ${getDifficultyColor(
                      quiz.difficulty
                    )}`}
                  ></div>
                  <div className="p-4 md:p-6">
                    <div className="flex justify-end mb-3 md:mb-4">
                      <span className="px-2 py-0.5 md:px-3 md:py-1 text-xs max-md:text-[10px] font-medium rounded-full bg-gray-100 text-gray-900">
                        {quiz.difficulty === "Beginner"
                          ? "Débutant"
                          : quiz.difficulty === "Intermediate"
                            ? "Intermédiaire"
                            : "Avancé"}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl max-md:text-base font-semibold mb-1 md:mb-2 group-hover:text-gray-900 transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-xs md:text-sm max-md:text-xs text-gray-600 mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                      {quiz.description}
                    </p>
                    <div className="flex justify-between text-xs md:text-sm max-md:text-xs text-gray-600 mb-4 md:mb-6">
                      <span>{quiz.questionCount || 0} questions</span>
                      <span>{quiz.timeLimit || 10} min</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 md:py-2.5 border border-gray-200 rounded text-sm max-md:text-xs font-medium group-hover:bg-black group-hover:text-white group-hover:border-black transition-all mobile-touch-target h-auto max-md:h-10">
                      <Play className="w-4 h-4" />
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <BottomNavigation />
    </>
  );
};

export default QuizList;
