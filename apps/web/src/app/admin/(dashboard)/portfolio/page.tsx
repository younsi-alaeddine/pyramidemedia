import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminResourceTable } from "@/components/admin/resource-table";

export default function AdminPortfolioPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground">
          Manage portfolio projects stored in the database.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Items</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminResourceTable resource="portfolio" subtitleKey="client" />
        </CardContent>
      </Card>
    </div>
  );
}
