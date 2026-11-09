import { z } from "zod";

export const lifecycleStatuses = ["Discontinued", "Shut Down", "Cancelled", "Abandoned", "Failed", "Acquired & Ended", "Merged", "Replaced", "Changed Direction", "Shutting Down Soon", "Inactive", "Unknown"] as const;
export const thingTypes = ["Product", "Company", "App", "Website", "Service", "Game", "Film", "TV project", "Technology", "Physical product", "Organization", "Project", "Feature", "Publication", "Other"] as const;
const text = z.string().trim().min(1);
const webUrl = z.string().url().refine(v => /^https?:\/\//i.test(v), "Use an http or https address.");
export const entrySchema = z.object({
  name: text, slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: text, organization: z.string().trim(), type: z.enum(thingTypes),
  status: z.enum(lifecycleStatuses), launch: z.string().trim(),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), whatHappened: text,
  officialReason: z.string().trim(), replacedBy: z.string().trim(),
  reportedFactors: z.array(text), userImpact: z.array(text), alternatives: z.array(text),
  timeline: z.array(z.object({ date: text, title: text, sourced: z.boolean().optional() })),
  sources: z.array(z.object({ title: text, url: webUrl, publisher: text, type: z.enum(["Official announcement", "Company documentation", "Public record", "Direct statement", "Reporting", "Other"]) })),
  gallery: z.array(z.object({ id: text, src: webUrl, caption: z.string().optional(), date: z.string().optional(), source: z.string().optional() })).default([]),
});
export const storySchema = z.object({ slug: text, relationship: z.enum(["Built it", "Worked there", "Used it", "Invested in it", "Witnessed it", "Other connection"]), body: text });
export const correctionSchema = z.object({ slug: text, message: text, sourceUrl: z.union([webUrl, z.literal("")]), kind: z.enum(["correction", "source"]) });
export const reportSchema = z.object({ targetType: z.enum(["story", "thing"]), targetId: text, reason: text });
export type EntryInput = z.infer<typeof entrySchema>;
export function mayPublish(isAdmin: boolean) { return isAdmin; }