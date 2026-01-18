import HistoryTable from "../../components/admin/HistoryTable";

export default function HistoryPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6 max-md:mb-4">
        <div>
          <h2 className="text-xl font-medium max-md:text-lg">Historique des Utilisateurs</h2>
          <p className="text-sm text-[#737373] mt-1 max-md:text-xs">Consultez les résultats et progressions</p>
        </div>
      </div>
      <HistoryTable />
    </>
  );
}
