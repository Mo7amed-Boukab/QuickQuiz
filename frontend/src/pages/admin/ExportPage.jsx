import ExportSection from "../../components/admin/ExportSection";

export default function ExportPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Exportation des Données</h2>
      </div>
      <ExportSection />
    </>
  );
}
