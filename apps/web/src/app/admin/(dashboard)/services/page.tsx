import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminResourceTable } from "@/components/admin/resource-table";

export default function AdminServicesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Services</h1>
        <p className="text-muted-foreground">
          Manage services stored in the database.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminResourceTable resource="services" subtitleKey="slug" />
        </CardContent>
      </Card>
    </div>
  );
}
