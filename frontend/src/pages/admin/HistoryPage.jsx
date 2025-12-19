import HistoryTable from "../../components/admin/HistoryTable";

export default function HistoryPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Historique des Utilisateurs</h2>
      </div>
      <HistoryTable />
    </>
  );
}
