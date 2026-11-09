import { describe, expect, test } from "bun:test";
import { storySchema, correctionSchema, mayPublish, lifecycleStatuses } from "./contribution-rules";

describe("contribution rules", () => {
  test("a short first-hand contribution is eligible", () => {
    expect(storySchema.parse({ slug: "pocket", relationship: "Used it", body: "I used it." }).body).toBe("I used it.");
  });
  test("only admins can publish", () => { expect(mayPublish(false)).toBe(false); expect(mayPublish(true)).toBe(true); });
  test("source contributions reject non-web addresses", () => {
    expect(correctionSchema.safeParse({ slug: "pocket", message: "Official source", sourceUrl: "javascript:alert(1)", kind: "source" }).success).toBe(false);
  });
  test("ending is not automatically failure", () => { expect(lifecycleStatuses).toContain("Discontinued"); expect(lifecycleStatuses).toContain("Failed"); expect(lifecycleStatuses).toContain("Unknown"); });
});