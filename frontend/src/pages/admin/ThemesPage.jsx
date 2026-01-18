import { useState, useEffect } from "react";
import ThemesTable from "../../components/admin/ThemesTable";
import ThemeModal from "../../components/admin/ThemeModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { getThemes, createTheme, deleteTheme, updateTheme } from "../../services/themeService";
import { Plus } from "lucide-react";

export default function ThemesPage() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [themeToDelete, setThemeToDelete] = useState(null);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const data = await getThemes();
      // Ensure data is array
      if (Array.isArray(data)) {
        setThemes(data);
      } else if (data.data && Array.isArray(data.data)) {
        setThemes(data.data);
      } else {
        setThemes([]);
        console.error("Format de thèmes inattendu:", data);
      }
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des thèmes");
      console.error(err);
      setThemes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  // Edit modal state 
  const [themeToEdit, setThemeToEdit] = useState(null);

  const handleCreateOrUpdateTheme = async (themeData) => {
    try {
      if (themeToEdit) {
        await updateTheme(themeToEdit._id, themeData);
      } else {
        await createTheme(themeData);
      }
      fetchThemes();
      setError(null);
      handleCloseModal();
    } catch (err) {
      console.error("Erreur save thème:", err);
    }
  };

  const handleEditClick = (theme) => {
    setThemeToEdit(theme);
    setIsThemeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsThemeModalOpen(false);
    setThemeToEdit(null);
  };

  const handleDeleteClick = (id) => {
    const theme = themes.find(t => t._id === id);
    if (theme) {
      setThemeToDelete(theme);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!themeToDelete) return;
    try {
      await deleteTheme(themeToDelete._id);
      setThemes(themes.filter((t) => t._id !== themeToDelete._id));
      setThemeToDelete(null);
    } catch (err) {
      console.error("Erreur suppression thème:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 max-md:mb-4">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-medium max-md:text-lg">Gestion des Thèmes</h2>
          <p className="text-sm text-[#737373] mt-1 max-md:text-xs max-md:line-clamp-1">Gérez les thématiques des quiz</p>
        </div>
        <button
          onClick={() => {
            setThemeToEdit(null);
            setIsThemeModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 max-md:p-2 rounded text-sm hover:bg-black transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Thème</span>
        </button>
      </div>

      <ThemesTable
        themes={themes}
        loading={loading}
        error={error}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrUpdateTheme}
        themeToEdit={themeToEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer le thème"
        message={`Êtes-vous sûr de vouloir supprimer le thème "${themeToDelete?.title || themeToDelete?.name}" ? Cette action est irréversible.`}
      />
    </>
  );
}
