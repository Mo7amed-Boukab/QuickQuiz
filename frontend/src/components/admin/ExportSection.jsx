import { Download } from "lucide-react";
import { useState } from "react";
import { getQuizzes } from "../../services/quizService";
import { getQuestions } from "../../services/questionService";
import { getUsers } from "../../services/userService";
import { getThemes } from "../../services/themeService";

export default function ExportSection() {
  const [loading, setLoading] = useState(false);

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data, headers) => {
    if (!data || !data.length) return headers.join(",") + "\n";

    const rows = data.map((row) =>
      headers
        .map((h) => {
          const val = row[h];
          if (val === null || val === undefined) return "";
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  const handleExport = async (type, format) => {
    try {
      setLoading(true);

      let data = [];
      let filename = "";
      let headers = [];

      if (type === "quiz") {
        const res = await getQuizzes();
        const quizzes = Array.isArray(res) ? res : res?.data || [];

        data = quizzes.map((q) => ({
          id: q._id,
          title: q.title,
          theme: typeof q.theme === "object" ? q.theme?.name : q.theme || "",
          level: q.level || "",
          duration: q.duration || 0,
          totalQuestions: q.totalQuestions || 0,
        }));

        headers = [
          "id",
          "title",
          "theme",
          "level",
          "duration",
          "totalQuestions",
        ];
        filename = `quizzes_${Date.now()}`;
      } else if (type === "questions") {
        const res = await getQuestions();
        const questions = Array.isArray(res) ? res : res?.data || [];

        data = questions.map((q) => ({
          id: q._id,
          question: q.question,
          quiz: typeof q.quiz === "object" ? q.quiz?.title : q.quiz || "",
          optionsCount: q.options?.length || 0,
        }));

        headers = ["id", "question", "quiz", "optionsCount"];
        filename = `questions_${Date.now()}`;
      } else if (type === "users") {
        const res = await getUsers();
        const users = Array.isArray(res) ? res : res?.data || [];

        data = users.map((u) => ({
          id: u._id,
          username: u.username,
          email: u.email,
          role: u.role,
        }));

        headers = ["id", "username", "email", "role"];
        filename = `users_${Date.now()}`;
      } else if (type === "complete") {
        const [quizRes, questionRes, userRes, themeRes] = await Promise.all([
          getQuizzes(),
          getQuestions(),
          getUsers(),
          getThemes(),
        ]);

        const exportData = {
          quizzes: Array.isArray(quizRes) ? quizRes : quizRes?.data || [],
          questions: Array.isArray(questionRes)
            ? questionRes
            : questionRes?.data || [],
          users: Array.isArray(userRes) ? userRes : userRes?.data || [],
          themes: Array.isArray(themeRes) ? themeRes : themeRes?.data || [],
          exportedAt: new Date().toISOString(),
        };

        const jsonStr = JSON.stringify(exportData, null, 2);
        downloadFile(
          jsonStr,
          `complete_export_${Date.now()}.json`,
          "application/json"
        );
        setLoading(false);
        return;
      }

      if (format === "csv") {
        const csv = convertToCSV(data, headers);
        downloadFile(csv, `${filename}.csv`, "text/csv");
      } else if (format === "json") {
        const jsonStr = JSON.stringify(data, null, 2);
        downloadFile(jsonStr, `${filename}.json`, "application/json");
      }

      setLoading(false);
    } catch (error) {
      console.error("Export error:", error);
      alert("Erreur lors de l'exportation.");
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4">
      {/* Export Quiz */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6 max-md:p-4">
        <h2 className="text-lg font-medium mb-2 max-md:text-base">Export Quiz</h2>
        <p className="text-sm text-[#737373] mb-6 max-md:mb-4 max-md:text-xs">
          Exporter tous les quiz au format CSV ou JSON
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("quiz", "csv")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 h-9 bg-[#1a1a1a] text-white rounded hover:bg-black text-sm disabled:opacity-50 transition-colors max-md:flex-1 max-md:h-10"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            onClick={() => handleExport("quiz", "json")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 h-9 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] text-sm disabled:opacity-50 transition-colors max-md:flex-1 max-md:h-10"
          >
            <Download className="w-4 h-4" /> JSON
          </button>
        </div>
      </div>

      {/* Export Questions */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6 max-md:p-4">
        <h2 className="text-lg font-medium mb-2 max-md:text-base">Export Questions</h2>
        <p className="text-sm text-[#737373] mb-6 max-md:mb-4 max-md:text-xs">
          Exporter toutes les questions au format CSV ou JSON
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("questions", "csv")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 h-9 bg-[#1a1a1a] text-white rounded hover:bg-black text-sm disabled:opacity-50 transition-colors max-md:flex-1 max-md:h-10"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            onClick={() => handleExport("questions", "json")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 h-9 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] text-sm disabled:opacity-50 transition-colors max-md:flex-1 max-md:h-10"
          >
            <Download className="w-4 h-4" /> JSON
          </button>
        </div>
      </div>

      {/* Export Utilisateurs */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6 max-md:p-4">
        <h2 className="text-lg font-medium mb-2 max-md:text-base">Export Utilisateurs</h2>
        <p className="text-sm text-[#737373] mb-6 max-md:mb-4 max-md:text-xs">
          Exporter tous les utilisateurs au format CSV ou JSON
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("users", "csv")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 h-9 bg-[#1a1a1a] text-white rounded hover:bg-black text-sm disabled:opacity-50 transition-colors max-md:flex-1 max-md:h-10"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            onClick={() => handleExport("users", "json")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 h-9 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] text-sm disabled:opacity-50 transition-colors max-md:flex-1 max-md:h-10"
          >
            <Download className="w-4 h-4" /> JSON
          </button>
        </div>
      </div>

      {/* Export Complet */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6 max-md:p-4">
        <h2 className="text-lg font-medium mb-2 max-md:text-base">Export Complet</h2>
        <p className="text-sm text-[#737373] mb-6 max-md:mb-4 max-md:text-xs">
          Exporter toutes les données de la plateforme
        </p>
        <button
          onClick={() => handleExport("complete")}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2 h-9 bg-[#1a1a1a] text-white rounded hover:bg-black text-sm disabled:opacity-50 transition-colors w-auto max-md:w-full max-md:h-10"
        >
          <Download className="w-4 h-4" />
          {loading ? "Export en cours..." : "Export Complet"}
        </button>
      </div>
    </div>
  );
}
