import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return <main className="mx-auto max-w-2xl px-4 pb-24"><PageTitle title="Contact" sub="Have a question, correction, or a story to share?" /><div className="mt-10 border-t border-foreground pt-6"><details><summary className="cursor-pointer font-mono text-sm uppercase tracking-wider">Reveal email address</summary><a className="mt-5 inline-block font-display text-3xl font-semibold underline" href="mailto:hello@scruttin.com">hello@scruttin.com</a></details></div></main>;
}
