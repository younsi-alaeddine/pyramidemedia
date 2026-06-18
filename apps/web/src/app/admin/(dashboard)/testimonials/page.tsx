import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminResourceTable } from "@/components/admin/resource-table";

export default function AdminTestimonialsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <p className="text-muted-foreground">
          Manage client testimonials stored in the database.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminResourceTable
            resource="testimonials"
            titleKey="name"
            subtitleKey="company"
          />
        </CardContent>
      </Card>
    </div>
  );
}
