import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminResourceTable } from "@/components/admin/resource-table";

export default function AdminBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Manage blog posts stored in the database.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminResourceTable resource="blog" subtitleKey="slug" />
        </CardContent>
      </Card>
    </div>
  );
}
