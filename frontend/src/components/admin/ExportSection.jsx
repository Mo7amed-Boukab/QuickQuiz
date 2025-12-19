import { Download } from "lucide-react";

export default function ExportSection() {
  const handleExport = (type, format) => {
    console.log(`Exporting ${type} as ${format}`);
    // Logic d'export ici
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Export Quiz */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6">
        <h2 className="text-lg mb-2">Export Quiz</h2>
        <p className="text-sm text-[#737373] mb-6">
          Exporter tous les quiz au format CSV ou JSON
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("quiz", "csv")}
            className="flex items-center gap-2 px-4 py-1 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={() => handleExport("quiz", "json")}
            className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>

      {/* Export Questions */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6">
        <h2 className="text-lg mb-2">Export Questions</h2>
        <p className="text-sm text-[#737373] mb-6">
          Exporter toutes les questions au format CSV ou JSON
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("questions", "csv")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={() => handleExport("questions", "json")}
            className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>

      {/* Export Utilisateurs */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6">
        <h2 className="text-lg mb-2">Export Utilisateurs</h2>
        <p className="text-sm text-[#737373] mb-6">
          Exporter tous les utilisateurs au format CSV ou JSON
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("users", "csv")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={() => handleExport("users", "json")}
            className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>

      {/* Export Complet */}
      <div className="bg-white border border-[#e5e5e5] rounded p-6">
        <h2 className="text-lg font-medium mb-2">Export Complet</h2>
        <p className="text-sm text-[#737373] mb-6">
          Exporter toutes les données de la plateforme
        </p>
        <button
          onClick={() => handleExport("complete", "zip")}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-black transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Export Complet
        </button>
      </div>
    </div>
  );
}
