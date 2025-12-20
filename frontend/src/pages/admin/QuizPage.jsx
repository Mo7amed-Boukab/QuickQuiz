import { useState, useEffect } from "react";
import QuizTable from "../../components/admin/QuizTable";
import { getQuizStats } from "../../services/quizService";

export default function QuizStatsPage() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getQuizStats();
            if (response.success && Array.isArray(response.data)) {
                setStats(response.data);
            } else {
                setStats([]);
            }
        } catch (err) {
            setError("Impossible de charger les statistiques des quiz");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-medium">List des Quiz</h2>
                <p className="text-sm text-[#737373] mt-1">Vue d'ensemble des quiz, questions et engagement utilisateur</p>
            </div>
            <QuizTable stats={stats} loading={loading} error={error} />
        </>
    );
}
