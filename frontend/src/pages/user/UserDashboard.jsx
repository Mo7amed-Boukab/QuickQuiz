import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';

export default function UserDashboard() {
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        averageScore: 0,
        totalTime: 0,
        bestStreak: 0,
    });
    const [leaderboard, setLeaderboard] = useState([]);

    const syncStats = () => {
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');

        if (!history.length) {
            setStats({ totalQuizzes: 0, averageScore: 0, totalTime: 0, bestStreak: 0 });
            setLeaderboard([]);
            return;
        }

        const total = history.length;
        const avgScore = Math.round(
            history.reduce((acc, h) => {
                const maxPoints = (h.totalQuestions || 0) * 10 || 1;
                return acc + (h.score / maxPoints) * 100;
            }, 0) / total
        );
        const totalTimeSeconds = history.reduce((acc, h) => acc + (h.timeTakenSeconds || h.timeElapsed || 0), 0);
        const totalTime = Math.round(totalTimeSeconds / 60);

        const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
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

        const aggregates = history.reduce((acc, item) => {
            const name = item.userName || 'Anonyme';
            const maxPoints = (item.totalQuestions || 0) * 10 || 1;
            const percent = (item.score / maxPoints) * 100;

            if (!acc[name]) {
                acc[name] = { count: 0, totalPercent: 0, totalScore: 0 };
            }
            acc[name].count += 1;
            acc[name].totalPercent += percent;
            acc[name].totalScore += item.score;
            return acc;
        }, {});

        const top = Object.entries(aggregates)
            .map(([name, data]) => {
                const avgPercent = Math.round(data.totalPercent / data.count);
                const statsText = `${data.count} quiz complétés • ${avgPercent}% de moyenne`;
                const scoreLabel = `${data.totalScore} pts`;
                return { name, stats: statsText, score: scoreLabel, avgPercent };
            })
            .sort((a, b) => b.avgPercent - a.avgPercent)
            .slice(0, 5)
            .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

        setLeaderboard(top);
    };

    useEffect(() => {
        syncStats();

        const onStorage = (event) => {
            if (event.key === 'quizHistory') {
                syncStats();
            }
        };

        const onCustom = () => syncStats();

        window.addEventListener('storage', onStorage);
        window.addEventListener('focus', onCustom);
        window.addEventListener('quizHistoryUpdated', onCustom);

        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('focus', onCustom);
            window.removeEventListener('quizHistoryUpdated', onCustom);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[rgba(0,0,0,0.01)]">
            <Header />

            {/* Main Dashboard Content */}
            <main className="py-8">
                <div className="max-w-[1200px] mx-auto px-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {/* Quiz Complétés */}
                        <div className="bg-white border border-[#e5e5e5] rounded p-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[rgba(59,130,246,0.1)] flex items-center justify-center flex-shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a1e3eff" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10,9 9,9 8,9" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-3xl font-bold text-[#1a1a1a] leading-none">{stats.totalQuizzes}</div>
                                <div className="text-sm text-[#737373] mt-1">Quiz Complétés</div>
                            </div>
                        </div>
                        {/* Score Moyen */}
                        <div className="bg-white border border-[#e5e5e5] rounded p-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center flex-shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#094632ff" strokeWidth="2">
                                    <polyline points="20,6 9,17 4,12" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-3xl font-bold text-[#1a1a1a] leading-none">{stats.averageScore}%</div>
                                <div className="text-sm text-[#737373] mt-1">Score Moyen</div>
                            </div>
                        </div>

                        {/* Temps Total */}
                        <div className="bg-white border border-[#e5e5e5] rounded p-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[rgba(249,115,22,0.1)] flex items-center justify-center flex-shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#823f10ff" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12,6 12,12 16,14" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-3xl font-bold text-[#1a1a1a] leading-none">{stats.totalTime}min</div>
                                <div className="text-sm text-[#737373] mt-1">Temps Total</div>
                            </div>
                        </div>

                        {/* Meilleure Série */}
                        <div className="bg-white border border-[#e5e5e5] rounded p-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[rgba(234,179,8,0.1)] flex items-center justify-center flex-shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#674e03ff" strokeWidth="2">
                                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-3xl font-bold text-[#1a1a1a] leading-none">{stats.bestStreak}</div>
                                <div className="text-sm text-[#737373] mt-1">Meilleure Série</div>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Classement Global</h2>
                        <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
                            {leaderboard.map((player) => (
                                <div
                                    key={player.rank}
                                    className={`flex items-center gap-4 py-5 px-6 border-b border-[#e5e5e5] last:border-0 transition-colors hover:bg-[rgba(0,0,0,0.02)] ${player.rank === 1
                                            ? 'bg-[rgba(0,0,0,0.02)] border-l-[3px] border-l-[#1a1a1a]'
                                            : player.rank === 2
                                                ? 'bg-[rgba(0,0,0,0.01)] border-l-[3px] border-l-[#737373]'
                                                : player.rank === 3
                                                    ? 'bg-[rgba(0,0,0,0.01)] border-l-[3px] border-l-[#a3a3a3]'
                                                    : ''
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 border-2 ${player.rank === 1
                                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                                : player.rank === 2
                                                    ? 'bg-[#737373] text-white border-[#737373]'
                                                    : player.rank === 3
                                                        ? 'bg-[#a3a3a3] text-white border-[#a3a3a3]'
                                                        : 'bg-[#f5f5f5] text-[#1a1a1a] border-[#e5e5e5]'
                                            }`}
                                    >
                                        {player.rank}
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 border border-[#e5e5e5]">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#737373"
                                            strokeWidth="2"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-base mb-1 text-[#1a1a1a]">{player.name}</div>
                                        <div className="text-sm text-[#737373]">{player.stats}</div>
                                    </div>
                                    <div className="font-semibold text-[1.125rem] text-[#1a1a1a] flex-shrink-0">
                                        {player.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Actions Rapides</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link
                                to="/quizlist"
                                className="bg-white border border-[#e5e5e5] rounded p-6 text-center cursor-pointer transition-all hover:-translate-y-0.5 no-underline text-inherit block"
                            >
                                <div className="w-12 h-12 bg-[rgba(26,26,26,0.1)] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1a1a1a]">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M5 12l5 5l10-10" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Nouveau Quiz</h3>
                                <p className="text-[#737373] text-sm">Commencer un nouveau défi</p>
                            </Link>

                            <button className="bg-white border border-[#e5e5e5] rounded p-6 text-center cursor-pointer transition-all hover:-translate-y-0.5">
                                <div className="w-12 h-12 bg-[rgba(26,26,26,0.1)] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1a1a1a]">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <polygon points="10,8 16,12 10,16 10,8" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Mode Pratique</h3>
                                <p className="text-[#737373] text-sm">Réviser vos erreurs</p>
                            </button>

                            <button className="bg-white border border-[#e5e5e5] rounded p-6 text-center cursor-pointer transition-all hover:-translate-y-0.5">
                                <div className="w-12 h-12 bg-[rgba(26,26,26,0.1)] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1a1a1a]">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                        <path d="M4 22h16" />
                                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Réalisations</h3>
                                <p className="text-[#737373] text-sm">Voir vos badges</p>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}