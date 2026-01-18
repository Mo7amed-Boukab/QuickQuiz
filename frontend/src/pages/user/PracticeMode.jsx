import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BottomNavigation from "../../components/common/BottomNavigation";
import Loader from "../../components/common/Loader";
import { getQuestions } from "../../services/questionService";
import { useAuth } from "../../context/AuthContext";

export default function PracticeMode() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userKey =
    user?._id || user?.id || user?.userId || user?.email || user?.username;
  const resolvedStorageKey = userKey ? `practiceResolved:${userKey}` : null;
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shouldRemoveCurrent, setShouldRemoveCurrent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const allHistory = JSON.parse(
          localStorage.getItem("quizHistory") || "[]",
        );
        const history = userKey
          ? allHistory.filter(
              (h) => h.userId === userKey || h.userKey === userKey || h.userEmail === userKey,
            )
          : [];

        if (!history.length) {
          setPracticeQuestions([]);
          return;
        }

        const questionsResponse = await getQuestions();
        const allQuestions = questionsResponse?.data || [];
        const questionMap = allQuestions.reduce((acc, q) => {
          acc[q._id] = q;
          return acc;
        }, {});

        const attempts = [...history].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        const resolvedIds = resolvedStorageKey
          ? new Set(JSON.parse(localStorage.getItem(resolvedStorageKey) || "[]"))
          : new Set();
        const incorrectMap = new Map();

        attempts.forEach((attempt) => {
          if (!Array.isArray(attempt.answers)) return;
          attempt.answers.forEach((answer) => {
            const q = questionMap[answer.question];
            if (!q || !Array.isArray(q.options)) return;
            const correctIndex = q.options.findIndex((opt) => opt.isCorrect);
            if (correctIndex === -1) return;
            if (answer.selectedOption !== correctIndex) {
              if (!incorrectMap.has(q._id)) {
                if (resolvedIds.has(q._id)) return;
                incorrectMap.set(q._id, {
                  id: q._id,
                  question: q.question,
                  options: q.options,
                  correctIndex,
                  lastSelected:
                    typeof answer.selectedOption === "number"
                      ? answer.selectedOption
                      : -1,
                  quizTitle:
                    typeof q.quiz === "object"
                      ? q.quiz?.title || "Quiz"
                      : attempt.title || "Quiz",
                });
              }
            }
          });
        });

        setPracticeQuestions(Array.from(incorrectMap.values()));
      } catch (err) {
        console.error("Error loading practice questions", err);
        setError("Impossible de charger le mode pratique.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      load();
    }
  }, [user]);

  const current = practiceQuestions[currentIndex];
  const total = practiceQuestions.length;
  const progress = total
    ? Math.round(((currentIndex + (showFeedback ? 1 : 0)) / total) * 100)
    : 0;

  const handleSelect = (idx) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === current?.correctIndex) {
      setShouldRemoveCurrent(true);
      if (resolvedStorageKey && current?.id) {
        const resolvedIds = new Set(
          JSON.parse(localStorage.getItem(resolvedStorageKey) || "[]"),
        );
        resolvedIds.add(current.id);
        localStorage.setItem(
          resolvedStorageKey,
          JSON.stringify(Array.from(resolvedIds)),
        );
      }
    }
  };

  const handleNext = () => {
    if (shouldRemoveCurrent && current) {
      const updated = practiceQuestions.filter((q) => q.id !== current.id);
      setPracticeQuestions(updated);
      setShouldRemoveCurrent(false);
      if (updated.length === 0) {
        navigate("/dashboard");
        return;
      }
      const nextIndex = currentIndex >= updated.length ? updated.length - 1 : currentIndex;
      setCurrentIndex(nextIndex);
      setSelected(null);
      setShowFeedback(false);
      return;
    }

    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      navigate("/dashboard");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowFeedback(false);
    setShouldRemoveCurrent(false);
  };

  const getButtonClass = (idx) => {
    if (!showFeedback) {
      return selected === idx
        ? "border-black bg-gray-50"
        : "border-gray-200 hover:border-gray-300";
    }

    if (idx === current?.correctIndex) {
      return "border-green-500 bg-green-50 text-green-700";
    }
    if (idx === selected) {
      return "border-red-500 bg-red-50 text-red-700";
    }
    return "border-gray-200 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader text="Chargement du mode pratique..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgba(0,0,0,0.01)] pb-20 md:pb-0">
      <Header />
      <main className="py-6 md:py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                Basé sur vos erreurs récentes
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Mode Pratique
              </h1>
            </div>
            <div className="text-right">
              <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">
                Progression
              </div>
              <div className="text-lg md:text-xl font-medium text-gray-900">
                {progress}%
              </div>
            </div>
          </div>

          <div className="h-1.5 md:h-2 bg-gray-200 overflow-hidden mb-4 md:mb-6 rounded-full">
            <div
              className="h-full bg-black transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 mb-6">
              {error}
            </div>
          )}

          {!total && !error && (
            <div className="bg-white border border-gray-200 rounded p-6 md:p-8 text-center">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Rien à réviser
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Vous n'avez pas encore d'erreurs enregistrées. Lancez un quiz
                pour générer des questions à revoir.
              </p>
              <button
                onClick={() => navigate("/quizlist")}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900 min-h-[48px] md:min-h-0"
              >
                Aller aux quiz
              </button>
            </div>
          )}

          {total > 0 && current && (
            <div className="bg-white border border-gray-200 rounded p-4 md:p-8">
              <div className="flex items-center justify-between mb-3 md:mb-4 text-xs md:text-sm text-gray-600">
                <span>
                  Question {currentIndex + 1} sur {total}
                </span>
                <span className="truncate max-w-[150px]">
                  {current.quizTitle}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 break-words">
                {current.question}
              </h2>

              <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6 md:mb-8">
                {current.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`p-3 md:p-4 border rounded text-left transition-all min-h-[56px] relative active:bg-gray-50 overflow-hidden ${getButtonClass(
                      idx,
                    )}`}
                  >
                    <div className="flex items-start gap-3 md:gap-4 min-w-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium bg-gray-100 text-gray-700 flex-shrink-0 text-sm md:text-base mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 min-w-0 text-sm md:text-base break-words max-[360px]:break-all whitespace-normal text-left leading-tight py-1">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="mb-6 rounded border p-4 bg-gray-50">
                  <div className="text-sm font-semibold text-gray-800 mb-1">
                    Correction
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Réponse correcte :{" "}
                    {String.fromCharCode(65 + current.correctIndex)}
                  </p>
                  {selected !== current.correctIndex && selected !== null && (
                    <p className="text-gray-500 text-sm md:text-base mt-1">
                      Vous aviez choisi : {String.fromCharCode(65 + selected)}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col-reverse md:flex-row items-stretch md:items-center justify-between gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-3 md:py-2 border border-gray-200 text-gray-700 rounded hover:bg-gray-50 min-h-[48px] md:min-h-0 text-center"
                >
                  Retour
                </button>
                <div className="flex flex-col md:flex-row gap-2 md:gap-2">
                  <button
                    onClick={handleRestart}
                    className="px-4 py-3 md:py-2 border border-gray-200 text-gray-700 rounded hover:bg-gray-50 min-h-[48px] md:min-h-0"
                  >
                    Recommencer
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!showFeedback}
                    className="px-6 py-3 md:py-2 bg-black text-white rounded hover:bg-gray-900 disabled:opacity-60 min-h-[48px] md:min-h-0"
                  >
                    {currentIndex + 1 === total ? "Terminer" : "Suivant"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
