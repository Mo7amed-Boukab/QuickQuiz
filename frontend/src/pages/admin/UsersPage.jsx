import UsersTable from "../../components/admin/UsersTable";

export default function UsersPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Gestion des Utilisateurs</h2>
      </div>
      <UsersTable />
    </>
  );
}
