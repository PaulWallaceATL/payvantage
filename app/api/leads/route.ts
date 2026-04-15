import { z } from "zod";

const leadSchema = z.object({
  type: z.enum(["book_demo", "integration_interest"]).default("book_demo"),
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  businessName: z.string().min(1).max(200),
  monthlyVolume: z.string().max(500).optional(),
});

export async function POST(request: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const payload = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env["LEADS_WEBHOOK_URL"];
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("LEADS_WEBHOOK_URL responded with", res.status);
      }
    } catch (e) {
      console.error("Lead webhook request failed", e);
    }
  }

  return Response.json({ ok: true });
}
