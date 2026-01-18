import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Lock } from "lucide-react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/common/BottomNavigation";
import { useAuth } from "../../context/AuthContext";

export default function Achievements() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      const allHistory = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
      );
      const userHistory = allHistory.filter((h) => h.userId === user?._id);
      setHistory(userHistory);
    };

    if (user) {
      loadHistory();
    }

    const onCustom = () => {
      loadHistory();
    };

    window.addEventListener("quizHistoryUpdated", onCustom);
    window.addEventListener("storage", onCustom);
    window.addEventListener("focus", onCustom);

    return () => {
      window.removeEventListener("quizHistoryUpdated", onCustom);
      window.removeEventListener("storage", onCustom);
      window.removeEventListener("focus", onCustom);
    };
  }, [user]);

  const stats = useMemo(() => {
    if (!history.length) {
      return {
        totalQuizzes: 0,
        averagePercent: 0,
        bestScore: 0,
        bestStreak: 0,
        totalTimeSeconds: 0,
      };
    }

    const totalQuizzes = history.length;
    const avg = Math.round(
      history.reduce((acc, h) => {
        const maxPoints = (h.totalQuestions || 0) * 10 || 1;
        return acc + (h.score / maxPoints) * 100;
      }, 0) / totalQuizzes
    );
    const bestScore = Math.max(...history.map((h) => h.score || 0));
    const totalTimeSeconds = history.reduce(
      (acc, h) => acc + (h.timeTakenSeconds || h.timeElapsed || 0),
      0
    );

    const sorted = [...history].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    let streak = 0;
    let bestStreak = 0;
    sorted.forEach((item) => {
      if (item.score > 0) {
        streak += 1;
        bestStreak = Math.max(bestStreak, streak);
      } else {
        streak = 0;
      }
    });

    return {
      totalQuizzes,
      averagePercent: avg,
      bestScore,
      bestStreak,
      totalTimeSeconds,
    };
  }, [history]);

  const badges = useMemo(() => {
    return [
      {
        id: "first-quiz",
        title: "Première Victoire",
        description: "Terminer un premier quiz",
        unlocked: stats.totalQuizzes >= 1,
      },
      {
        id: "ten-quizzes",
        title: "Marathon",
        description: "10 quiz complétés",
        unlocked: stats.totalQuizzes >= 10,
      },
      {
        id: "avg-80",
        title: "Précision 80%",
        description: "Atteindre 80% de moyenne",
        unlocked: stats.averagePercent >= 80,
      },
      {
        id: "avg-100",
        title: "Sans Faute",
        description: "Atteindre 100% sur tous les quiz",
        unlocked: stats.averagePercent >= 100,
      },
      {
        id: "streak-3",
        title: "Série 3",
        description: "3 quiz réussis d'affilée",
        unlocked: stats.bestStreak >= 3,
      },
      {
        id: "streak-10",
        title: "Série 10",
        description: "10 quiz réussis d'affilée",
        unlocked: stats.bestStreak >= 10,
      },
      {
        id: "time-60",
        title: "Endurant",
        description: "1 heure de quiz cumulée",
        unlocked: stats.totalTimeSeconds >= 3600,
      },
      {
        id: "best-100",
        title: "Score Parfait",
        description: "Obtenir un score parfait sur un quiz",
        unlocked: history.some((h) => {
          const maxPoints = (h.totalQuestions || 0) * 10 || 1;
          return h.score >= maxPoints;
        }),
      },
    ];
  }, [stats, history]);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const hasHistory = history.length > 0;

  return (
    <div className="min-h-screen bg-[rgba(0,0,0,0.01)] pb-20 md:pb-0">
      <Header />
      <main className="py-6 md:py-8">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Vos jalons et badges</p>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Réalisations
              </h1>
            </div>
            <div className="text-right">
              <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">Badges débloqués</div>
              <div className="text-lg md:text-xl font-semibold text-gray-900">
                {unlockedCount}/{badges.length}
              </div>
            </div>
          </div>

          {!hasHistory && (
            <div className="bg-white border border-gray-200 rounded p-6 md:p-8 text-center">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Pas encore de badges
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Lancez un premier quiz pour commencer à débloquer des
                réalisations.
              </p>
            </div>
          )}

          {hasHistory && (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded p-3 md:p-4 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 transition-all text-center md:text-left ${badge.unlocked
                    ? "bg-green-50 border border-gray-100"
                    : "bg-white border border-gray-100"
                    }`}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border flex-shrink-0 ${badge.unlocked
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                  >
                    {badge.unlocked ? (
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Lock className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm md:text-base text-gray-900 mb-1 md:mb-0">
                      {badge.title}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-none">
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 md:mt-10 pt-6 flex flex-col-reverse md:flex-row gap-3 border-t border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-3 md:py-2 border border-gray-200 text-gray-700 rounded hover:bg-gray-50 min-h-[48px] md:min-h-0"
            >
              Retour
            </button>
            <Link
              to="/quizlist"
              className="px-6 py-3 md:py-2 bg-black text-white rounded hover:bg-gray-900 no-underline text-center min-h-[48px] md:min-h-0 flex items-center justify-center"
            >
              Lancer un quiz
            </Link>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
