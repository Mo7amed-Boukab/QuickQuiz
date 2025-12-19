import { Play } from "lucide-react";
import Header from "../../components/Header";

const QuizList = () => {
  const quizzes = [
    {
      id: "html",
      title: "HTML Fundamentals",
      description: "Master the building blocks of the web",
      difficulty: "Beginner",
      questions: 15,
      duration: "10 min",
      level: "easy",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "css",
      title: "CSS Styling",
      description: "Design beautiful and responsive layouts",
      difficulty: "Intermediate",
      questions: 20,
      duration: "15 min",
      level: "medium",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "javascript",
      title: "JavaScript Logic",
      description: "Build interactive web applications",
      difficulty: "Advanced",
      questions: 25,
      duration: "20 min",
      level: "hard",
      color: "from-orange-500 to-red-600",
    },
  ];

  const startQuiz = (quiz) => {
    console.log("selectedTheme", quiz.id);
    console.log("selectedLevel", quiz.level);
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
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => startQuiz(quiz)}
                className="bg-white border border-gray-200 rounded hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${quiz.color}`}></div>
                <div className="p-6">
                  <div className="flex justify-end mb-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-900">
                      {quiz.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {quiz.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-6">
                    <span>{quiz.questions} questions</span>
                    <span>{quiz.duration}</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded text-sm font-medium group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                    <Play className="w-4 h-4" />
                    Start Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizList;
