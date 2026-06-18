import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-widest text-primary uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold">
        Page Not Found / Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. /
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button asChild className="mt-8">
        <Link href="/fr">Back to Home / Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
