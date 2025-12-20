import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import Header from "../../components/Header";
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
            <section id="quizzes" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-semibold mb-4">
                            Choose Your Challenge
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Select a quiz that matches your skill level and start improving
                            your web development expertise today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {loading ? (
                            <div className="col-span-full text-center py-12 text-gray-600">
                                Chargement des quiz...
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
                                    className="bg-white border border-gray-200 rounded hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
                                >
                                    <div className={`h-1 bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)}`}></div>
                                    <div className="p-6">
                                        <div className="flex justify-end mb-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-900">
                                                {quiz.difficulty === "Beginner" ? "Débutant" :
                                                    quiz.difficulty === "Intermediate" ? "Intermédiaire" : "Avancé"}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-colors">
                                            {quiz.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-6">
                                            {quiz.description}
                                        </p>
                                        <div className="flex justify-between text-sm text-gray-600 mb-6">
                                            <span>{quiz.questionCount || 0} questions</span>
                                            <span>{quiz.timeLimit || 10} min</span>
                                        </div>
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded text-sm font-medium group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
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
        </>
    );
};

export default QuizList;
