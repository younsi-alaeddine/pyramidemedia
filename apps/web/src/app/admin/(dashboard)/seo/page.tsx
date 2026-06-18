import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSeoForm } from "@/components/admin/seo-form";

export default function AdminSeoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <p className="text-muted-foreground">
          Manage global SEO defaults and metadata.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global SEO</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSeoForm />
        </CardContent>
      </Card>
    </div>
  );
}
