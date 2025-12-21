import { useEffect, useMemo, useState } from "react";
import Loader from "../common/Loader";
import { getHistory } from "../../services/quizService";

export default function HistoryTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getHistory();
        const rows = Array.isArray(res) ? res : res?.data || [];
        setHistoryData(rows);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Impossible de charger l'historique.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const formattedRows = useMemo(() => {
    return historyData.map((item) => {
      const username = item?.user?.username || "-";
      const email = item?.user?.email || "-";
      const score = typeof item?.score === "number" ? item.score : 0;
      const themeName =
        item?.quiz?.theme?.name || item?.quizMetadata?.themeName || "-";
      const playedAt = item?.playedAt ? new Date(item.playedAt) : null;
      const dateLabel =
        playedAt && !Number.isNaN(playedAt.getTime())
          ? playedAt.toLocaleString("fr-FR")
          : "-";

      return {
        id: item?._id || `${username}-${dateLabel}`,
        user: username,
        email,
        score,
        theme: themeName,
        date: dateLabel,
      };
    });
  }, [historyData]);

  return (
    <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
      {loading && <Loader text="Chargement de l'historique..." />}

      {!loading && error && (
        <div className="p-6 text-sm text-red-600">{error}</div>
      )}

      {!loading && !error && formattedRows.length === 0 && (
        <div className="p-6 text-sm text-[#737373]">
          Aucun historique trouvé.
        </div>
      )}

      {!loading && !error && formattedRows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9fafb]">
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Utilisateur
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-24">
                  Score
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Thème
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-48">
                  Date de jeu
                </th>
              </tr>
            </thead>
            <tbody>
              {formattedRows.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                >
                  <td className="py-3 px-4 text-sm">{item.user}</td>
                  <td className="py-3 px-4 text-sm text-[#737373]">
                    {item.email}
                  </td>
                  <td className="py-3 px-4 text-sm">{item.score}</td>
                  <td className="py-3 px-4 text-sm">{item.theme}</td>
                  <td className="py-3 px-4 text-sm text-[#737373]">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
