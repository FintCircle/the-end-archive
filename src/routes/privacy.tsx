import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return <main className="mx-auto max-w-3xl px-4 pb-24"><PageTitle title="Privacy policy" sub="What we collect and why." /><div className="mt-10 space-y-8 text-lg leading-relaxed text-muted-foreground"><section><h2 className="font-display text-3xl font-semibold text-foreground">Information you provide</h2><p className="mt-3">When you create an account or contribute, we receive the information needed to provide those features, such as your account details and submitted content.</p></section><section><h2 className="font-display text-3xl font-semibold text-foreground">How we use it</h2><p className="mt-3">We use information to operate Scruttin, secure accounts, review contributions, respond to requests and improve the archive. We do not sell personal information.</p></section><section><h2 className="font-display text-3xl font-semibold text-foreground">Public contributions</h2><p className="mt-3">Contributions accepted into the archive may be published as part of the public record. Please do not include sensitive personal information you do not want to share publicly.</p></section><section><h2 className="font-display text-3xl font-semibold text-foreground">Questions</h2><p className="mt-3">For privacy questions or requests, contact us at hello@scruttin.com.</p></section></div></main>;
}
