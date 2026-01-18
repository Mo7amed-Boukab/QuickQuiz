import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Clock as ClockIcon,
  RotateCcw,
  Star,
  Trophy,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import { getQuestions } from "../../services/questionService";
import { getQuizzes, submitQuiz } from "../../services/quizService";
import { useAuth } from "../../context/AuthContext";

export default function Quiz() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [quizTimeLimit, setQuizTimeLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [finalResults, setFinalResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const timerRef = useRef(null);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        hasFinishedRef.current = false;
        setShowResultModal(false);
        setFinalResults(null);
        setSubmitting(false);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setUserAnswers([]);
        setQuiz(null);

        const quizzesResponse = await getQuizzes();
        const allQuizzes = quizzesResponse?.data ?? [];
        const quizMeta = Array.isArray(allQuizzes)
          ? allQuizzes.find((q) => q._id === quizId)
          : null;

        const questionsResponse = await getQuestions();
        const allQuestions = questionsResponse?.data ?? [];
        const quizQuestions = Array.isArray(allQuestions)
          ? allQuestions.filter((q) => {
              const questionQuizId =
                typeof q.quiz === "object" ? q.quiz._id : q.quiz;
              return questionQuizId === quizId;
            })
          : [];

        const derivedTimeLimit =
          quizMeta?.timeLimit ||
          (typeof quizQuestions[0]?.quiz === "object" &&
            quizQuestions[0].quiz.timeLimit) ||
          10;

        if (quizQuestions.length > 0) {
          setUserAnswers(new Array(quizQuestions.length).fill(null));
          const quizTitle =
            quizMeta?.title ||
            (typeof quizQuestions[0].quiz === "object"
              ? quizQuestions[0].quiz.title
              : "Quiz");
          setQuiz({
            title: quizTitle,
            questions: quizQuestions,
            timeLimit: derivedTimeLimit,
          });
        }

        setQuizTimeLimit(derivedTimeLimit);
        setTimeRemaining(derivedTimeLimit * 60);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizId]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (!loading && quiz && timeRemaining > 0 && !hasFinishedRef.current) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (hasFinishedRef.current) {
            return prev;
          }

          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishQuiz(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [loading, quiz]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader text="Chargement du quiz..." />
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">
            Aucune question disponible pour ce quiz
          </div>
          <button
            onClick={() => navigate("/quizlist")}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Retour aux quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  const getSegmentClass = (idx) => {
    if (idx === currentQuestion) {
      return "bg-black";
    }

    const answer = userAnswers[idx];
    if (answer === null || answer === undefined || answer === -1) {
      return "bg-gray-200";
    }

    const q = quiz.questions[idx];
    const correctIndex = q?.options?.findIndex((opt) => opt.isCorrect);
    return answer === correctIndex ? "bg-emerald-500" : "bg-red-500";
  };

  const handleNext = () => {
    if (selectedAnswer === null || submitting || hasFinishedRef.current) {
      return;
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(updatedAnswers);

    const correctIndex = question.options.findIndex((opt) => opt.isCorrect);
    if (selectedAnswer === correctIndex) {
      setScore((prev) => prev + 10);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(updatedAnswers[currentQuestion + 1] ?? null);
    } else {
      finishQuiz(false, updatedAnswers);
    }
  };

  const finishQuiz = async (isTimeout = false, answersSnapshot = null) => {
    if (!quiz || hasFinishedRef.current) {
      return;
    }

    hasFinishedRef.current = true;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const answersToUse = answersSnapshot
      ? [...answersSnapshot]
      : [...userAnswers];

    if (!isTimeout) {
      answersToUse[currentQuestion] = selectedAnswer ?? -1;
    } else if (selectedAnswer !== null) {
      answersToUse[currentQuestion] = selectedAnswer;
    }

    for (let i = 0; i < quiz.questions.length; i++) {
      if (answersToUse[i] === undefined || answersToUse[i] === null) {
        answersToUse[i] = -1;
      }
    }

    const correctCount = answersToUse.reduce((acc, ansIndex, idx) => {
      const correctIndex = quiz.questions[idx].options.findIndex(
        (opt) => opt.isCorrect,
      );
      return acc + (ansIndex === correctIndex ? 1 : 0);
    }, 0);

    const computedScore = correctCount * 10;
    const timeLimitSeconds = quizTimeLimit * 60;
    const elapsedSeconds = Math.min(
      timeLimitSeconds,
      Math.max(0, timeLimitSeconds - timeRemaining),
    );

    const payload = {
      quizId,
      timeTakenSeconds: elapsedSeconds,
      answers: answersToUse.map((ansIndex, idx) => ({
        question: quiz.questions[idx]._id,
        selectedOption: ansIndex,
      })),
    };

    try {
      setSubmitting(true);
      const response = await submitQuiz(payload);
      const payloadData = response?.data ?? response;
      const serverData = payloadData?.data ?? payloadData;

      const resolvedResults = {
        score: serverData?.score ?? computedScore,
        correctCount: serverData?.correctCount ?? correctCount,
        totalQuestions: serverData?.totalQuestions ?? quiz.questions.length,
        timeTakenSeconds: serverData?.timeTakenSeconds ?? elapsedSeconds,
        timeLimitSeconds: serverData?.timeLimitSeconds ?? timeLimitSeconds,
        percentage:
          serverData?.percentage ??
          Math.round((correctCount / quiz.questions.length) * 100),
      };

      setScore(resolvedResults.score);
      setFinalResults(resolvedResults);
      setShowResultModal(true);

      const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      const userKey =
        user?._id || user?.id || user?.userId || user?.email || user?.username;
      history.push({
        ...payload,
        score: resolvedResults.score,
        totalQuestions: resolvedResults.totalQuestions,
        correctCount: resolvedResults.correctCount,
        timeTakenSeconds: resolvedResults.timeTakenSeconds,
        percentage: resolvedResults.percentage,
        userId: userKey,
        userKey,
        userEmail: user?.email,
        userName: user?.fullName || user?.username || "Anonymous",
        date: new Date().toISOString(),
      });
      localStorage.setItem("quizHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Erreur lors de la sauvegarde du score.");
      navigate("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Clock
                className={`w-4 h-4 md:w-5 md:h-5 ${timeRemaining < 60 ? "text-red-600" : "text-gray-900"}`}
              />
              <span
                className={`font-mono font-semibold text-sm md:text-base ${timeRemaining < 60 ? "text-red-600" : ""}`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="text-center flex-1 mx-2">
              <div className="text-xs md:text-sm text-gray-600">
                <span className="hidden md:inline">Question </span>
                {currentQuestion + 1} / {quiz.questions.length}
              </div>
              <div className="font-semibold text-xs md:text-base truncate max-w-[150px] md:max-w-none mx-auto">
                {quiz.title}
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
              <span className="font-semibold text-sm md:text-base">
                {score} pts
              </span>
            </div>
          </div>
          <div className="flex gap-1 h-1 md:h-1.5 mt-0 md:mt-2 mb-0 md:mb-0">
            {quiz.questions.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-full transition-all duration-300 ${getSegmentClass(idx)}`}
              ></div>
            ))}
          </div>
        </div>
      </header>

      <main className="py-6 md:py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-white border border-gray-200 rounded p-4 md:p-8 mb-4 md:mb-8">
            <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 text-xs md:text-sm font-medium rounded-full mb-2 md:mb-4">
              Question {currentQuestion + 1}
            </span>
            <h2 className="text-lg md:text-2xl font-semibold break-words">
              {question.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6 md:mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`p-3 md:p-4 border rounded text-left transition-all min-h-[56px] relative active:bg-gray-50 overflow-hidden ${
                  selectedAnswer === index
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4 min-w-0">
                  <div
                    className={`w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center font-medium flex-shrink-0 text-sm md:text-base mt-0.5 ${
                      selectedAnswer === index
                        ? "bg-gray-200 text-black"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 min-w-0 text-sm md:text-base break-words max-[360px]:break-all whitespace-normal text-left leading-tight py-1">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null || submitting}
              className="w-full md:w-auto px-8 py-3 md:py-2 bg-black text-white rounded font-medium hover:bg-gray-900 transition-colors disabled:opacity-75 disabled:cursor-not-allowed text-sm md:text-base min-h-[48px]"
            >
              {currentQuestion + 1 === quiz.questions.length
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </main>

      {showResultModal && finalResults && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded max-w-xl w-[95%] md:w-full overflow-hidden animate-in fade-in zoom-in duration-300 shadow-xl">
            <div className="bg-gray-100 py-6 md:py-8 flex flex-col items-center justify-center relative">
              <div className="bg-white p-3 md:p-4 rounded-full mb-3 md:mb-4 shadow-sm">
                <Trophy className="w-10 h-10 md:w-12 md:h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Quiz Terminé
              </h3>
              <p className="text-sm md:text-base text-gray-600 mt-1 px-4 text-center">
                {quiz.title}
              </p>
            </div>

            <div className="p-4 md:p-8">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="bg-gray-50 p-3 md:p-4 rounded text-center">
                  <div className="text-xs md:text-sm text-gray-500 mb-1">
                    Score Final
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-black">
                    {finalResults.score}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 md:p-4 rounded text-center">
                  <div className="text-xs md:text-sm text-gray-500 mb-1">
                    Précision
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-black">
                    {finalResults.percentage}%
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Réponses Correctes</span>
                  </div>
                  <span className="font-semibold">
                    {finalResults.correctCount}/{finalResults.totalQuestions}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="w-4 h-4 text-blue-600" />
                    <span>Temps Utilisé</span>
                  </div>
                  <span className="font-semibold">
                    {formatTime(finalResults.timeTakenSeconds)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-3 md:py-2 bg-black text-white rounded hover:bg-gray-900 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <span>Retour au Tableau de Bord</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 md:py-2 border border-gray-200 text-gray-700 rounded hover:bg-gray-50 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Réessayer le Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
