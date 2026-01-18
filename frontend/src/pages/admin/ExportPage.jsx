import ExportSection from "../../components/admin/ExportSection";

export default function ExportPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6 max-md:mb-4">
        <h2 className="text-xl font-medium max-md:text-lg">Exportation des Données</h2>
      </div>
      <ExportSection />
    </>
  );
}
