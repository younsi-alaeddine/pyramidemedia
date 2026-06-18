import { AdminContactsTable } from "@/components/admin/contacts-table";

export default function AdminContactsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Contact Requests</h1>
        <p className="text-muted-foreground">
          View and manage incoming contact form submissions.
        </p>
      </div>

      <AdminContactsTable />
    </div>
  );
}
