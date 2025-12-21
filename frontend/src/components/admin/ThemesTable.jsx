import { useState } from "react";
import { Search } from "lucide-react";
import Loader from "../common/Loader";

export default function ThemesTable({
  themes,
  loading,
  error,
  onDelete,
  onEdit,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const filteredThemes = themes.filter((theme) =>
    theme.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader text="Chargement des thèmes..." />;

  if (error && themes.length === 0)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            placeholder="Rechercher un thème..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9fafb]">
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-20">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Nom
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[#737373] w-48">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredThemes.length > 0 ? (
                filteredThemes.map((theme) => (
                  <tr
                    key={theme._id}
                    className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-[#737373] font-mono text-xs">
                      {theme._id.substring(theme._id.length - 6)}
                    </td>
                    <td className="py-3 px-4 text-sm">{theme.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => onEdit && onEdit(theme)}
                          className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(theme._id)}
                          className="px-3 py-1 text-xs border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-8 text-center text-gray-500 text-sm"
                  >
                    Aucun thème trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
