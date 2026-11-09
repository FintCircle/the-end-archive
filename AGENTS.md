<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Lovable Cloud is the sole durable backend; frontend hosting must remain origin-independent so Vercel uses the same accounts and records.
- Public archive reads use publishable-key server functions and RLS; authenticated mutations use requireSupabaseAuth and verify admin roles before moderation.
- Publication state is separate from lifecycle status; archive detail content is validated JSON on archive_items to preserve complete records without losing partial dates.
