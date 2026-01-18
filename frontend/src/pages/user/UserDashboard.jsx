import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/common/BottomNavigation";
import { useAuth } from "../../context/AuthContext";
import { getLeaderboard } from "../../services/quizService";
import StatCard from "../../components/admin/StatCard";
import { Check, BarChart2, Clock, Trophy } from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalTime: 0,
    bestStreak: 0,
  });
  const [leaderboard, setLeaderboard] = useState([]);

  const syncStats = () => {
    const allHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");

    // Filter history for current user stats
    const userHistory = allHistory.filter((h) => h.userId === user?._id);

    if (!userHistory.length) {
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        totalTime: 0,
        bestStreak: 0,
      });
    } else {
      const total = userHistory.length;
      const avgScore = Math.round(
        userHistory.reduce((acc, h) => {
          const maxPoints = (h.totalQuestions || 0) * 10 || 1;
          return acc + (h.score / maxPoints) * 100;
        }, 0) / total
      );
      const totalTimeSeconds = userHistory.reduce(
        (acc, h) => acc + (h.timeTakenSeconds || h.timeElapsed || 0),
        0
      );
      const totalTime = Math.round(totalTimeSeconds / 60);

      const sorted = [...userHistory].sort(
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

      setStats({
        totalQuizzes: total,
        averageScore: avgScore,
        totalTime,
        bestStreak,
      });
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const response = await getLeaderboard();
      if (response.success) {
        const top = response.data.map((entry, idx) => ({
          rank: idx + 1,
          name: entry.name || "Anonyme",
          stats: `${entry.totalQuizzes} quiz complétés • ${entry.avgPercent}% de moyenne`,
          score: `${entry.totalScore} pts`,
        }));
        setLeaderboard(top);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    }
  };

  useEffect(() => {
    if (user) {
      syncStats();
      fetchLeaderboardData();
    }

    const onStorage = (event) => {
      if (event.key === "quizHistory") {
        syncStats();
      }
    };

    const onCustom = () => syncStats();

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onCustom);
    window.addEventListener("quizHistoryUpdated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onCustom);
      window.removeEventListener("quizHistoryUpdated", onCustom);
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-[rgba(0,0,0,0.01)]">
      <Header />

      {/* Main Dashboard Content */}
      <main className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-md:gap-3 mb-12 max-md:mb-8">
            <StatCard
              icon={Check}
              label="Quiz Complétés"
              value={stats.totalQuizzes.toString()}
              bgColor="bg-[rgba(59,130,246,0.1)]"
              iconColor="#0a1e3eff"
            />
            <StatCard
              icon={BarChart2}
              label="Score Moyen"
              value={`${stats.averageScore}%`}
              bgColor="bg-[rgba(16,185,129,0.1)]"
              iconColor="#094632ff"
            />
            <StatCard
              icon={Clock}
              label="Temps Total"
              value={`${stats.totalTime}min`}
              bgColor="bg-[rgba(249,115,22,0.1)]"
              iconColor="#823f10ff"
            />
            <StatCard
              icon={Trophy}
              label="Meilleure Série"
              value={stats.bestStreak.toString()}
              bgColor="bg-[rgba(234,179,8,0.1)]"
              iconColor="#674e03ff"
            />
          </div>

          {/* Leaderboard */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl max-md:text-lg font-semibold mb-3 md:mb-4 px-1">Classement Global</h2>
            <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-3 md:gap-4 py-3 px-4 md:py-5 md:px-6 border-b border-[#e5e5e5] last:border-0 transition-colors hover:bg-[rgba(0,0,0,0.02)] ${player.rank === 1
                    ? "bg-[rgba(0,0,0,0.02)] border-l-[3px] border-l-[#1a1a1a]"
                    : player.rank === 2
                      ? "bg-[rgba(0,0,0,0.01)] border-l-[3px] border-l-[#737373]"
                      : player.rank === 3
                        ? "bg-[rgba(0,0,0,0.01)] border-l-[3px] border-l-[#a3a3a3]"
                        : ""
                    }`}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm max-md:text-xs md:text-base flex-shrink-0 border-2 ${player.rank === 1
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : player.rank === 2
                        ? "bg-[#737373] text-white border-[#737373]"
                        : player.rank === 3
                          ? "bg-[#a3a3a3] text-white border-[#a3a3a3]"
                          : "bg-[#f5f5f5] text-[#1a1a1a] border-[#e5e5e5]"
                      }`}
                  >
                    {player.rank}
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 border border-[#e5e5e5] hidden xs:flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#737373"
                      strokeWidth="2"
                      className="md:w-[20px] md:h-[20px]"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm max-md:text-sm md:text-base mb-0.5 md:mb-1 text-[#1a1a1a] truncate">
                      {player.name}
                    </div>
                    <div className="text-xs md:text-sm max-md:text-xs text-[#737373] truncate">{player.stats}</div>
                  </div>
                  <div className="font-semibold text-base max-md:text-sm md:text-[1.125rem] text-[#1a1a1a] flex-shrink-0">
                    {player.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pb-4">
            <h2 className="text-xl md:text-2xl max-md:text-lg font-semibold mb-3 md:mb-4 px-1">Actions Rapides</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              <Link
                to="/quizlist"
                className="bg-white border border-[#e5e5e5] rounded p-4 md:p-6 text-center cursor-pointer transition-all no-underline text-inherit block hover:-translate-y-0.5 hover:shadow-lg active:bg-gray-50"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgba(26,26,26,0.1)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-[#1a1a1a]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="md:w-[24px] md:h-[24px]"
                  >
                    <path d="M5 12l5 5l10-10" />
                  </svg>
                </div>
                <h3 className="text-sm max-md:text-sm md:text-lg font-semibold mb-1 md:mb-2">Nouveau Quiz</h3>
                <p className="text-[#737373] text-xs max-md:text-[10px] md:text-sm hidden sm:block">
                  Commencer un nouveau défi
                </p>
              </Link>

              <Link
                to="/practice"
                className="bg-white border border-[#e5e5e5] rounded p-4 md:p-6 text-center cursor-pointer transition-all hover:-translate-y-0.5 no-underline text-inherit block hover:shadow-lg active:bg-gray-50"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgba(26,26,26,0.1)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-[#1a1a1a]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="md:w-[24px] md:h-[24px]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16 10,8" />
                  </svg>
                </div>
                <h3 className="text-sm max-md:text-sm md:text-lg font-semibold mb-1 md:mb-2">Mode Pratique</h3>
                <p className="text-[#737373] text-xs max-md:text-[10px] md:text-sm hidden sm:block">Réviser vos erreurs</p>
              </Link>

              <Link
                to="/achievements"
                className="bg-white border border-[#e5e5e5] rounded p-4 md:p-6 text-center cursor-pointer transition-all hover:-translate-y-0.5 no-underline text-inherit block hover:shadow-lg active:bg-gray-50"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgba(26,26,26,0.1)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-[#1a1a1a]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="md:w-[24px] md:h-[24px]"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <h3 className="text-sm max-md:text-sm md:text-lg font-semibold mb-1 md:mb-2">Réalisations</h3>
                <p className="text-[#737373] text-xs max-md:text-[10px] md:text-sm hidden sm:block">Voir vos badges</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
