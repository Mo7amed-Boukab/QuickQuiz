import ThemesTable from "../../components/admin/ThemesTable";
import AddThemeModal from "../../components/admin/AddThemeModal";
import { useState } from "react";

export default function ThemesPage() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [themes, setThemes] = useState([
    { id: 1, name: "theme 1", questions: 10 },
    { id: 2, name: "theme 2", questions: 15 },
    { id: 3, name: "theme 3", questions: 20 },
  ]);

  const handleAddTheme = (themeData) => {
    const newTheme = {
      id: themes.length + 1,
      name: themeData.name,
      questions: 0,
    };
    setThemes([...themes, newTheme]);
    console.log("New theme added:", newTheme);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Gestion des Thèmes</h2>
        <button
          onClick={() => setIsThemeModalOpen(true)}
          className="px-4 py-2 bg-[#1a1a1a] text-white rounded text-sm hover:bg-[#000] transition-colors"
        >
          + Nouveau Thème
        </button>
      </div>
      <ThemesTable />

      <AddThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        onSubmit={handleAddTheme}
      />
    </>
  );
}
