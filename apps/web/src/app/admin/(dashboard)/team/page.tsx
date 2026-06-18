import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminResourceTable } from "@/components/admin/resource-table";

export default function AdminTeamPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Team</h1>
        <p className="text-muted-foreground">
          Manage team members stored in the database.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminResourceTable
            resource="team"
            titleKey="name"
            subtitleKey="role"
          />
        </CardContent>
      </Card>
    </div>
  );
}
