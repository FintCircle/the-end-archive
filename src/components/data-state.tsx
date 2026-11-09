import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function DataError() {
  const router = useRouter();
  return <main className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-display text-3xl">The archive couldn’t load.</h1><p className="mt-3 text-muted-foreground">Please try again in a moment.</p><Button variant="outline" className="mt-6" onClick={() => router.invalidate()}>Try again</Button></main>;
}
export function DataNotFound() {
  return <main className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-display text-3xl">Not found in the archive.</h1></main>;
}