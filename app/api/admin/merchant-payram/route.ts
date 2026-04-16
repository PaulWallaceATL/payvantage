import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type Body = {
  merchant_id?: string;
  payram_project_id?: string | null;
  payram_project_name?: string | null;
  api_key?: string;
  payram_base_url?: string | null;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await request.json()) as Body;
    const merchantId = body.merchant_id?.trim();
    const apiKey = body.api_key?.trim();

    if (!merchantId) {
      return NextResponse.json(
        { error: "merchant_id is required" },
        { status: 400 }
      );
    }

    const baseUrl =
      typeof body.payram_base_url === "string" &&
      body.payram_base_url.trim().length > 0
        ? body.payram_base_url.trim()
        : null;

    const projectId = body.payram_project_id?.trim() || null;
    const projectName = body.payram_project_name?.trim() || null;
    const now = new Date().toISOString();

    if (apiKey) {
      const { error } = await supabase
        .from("merchant_payram_credentials")
        .upsert(
          {
            merchant_id: merchantId,
            payram_project_id: projectId,
            payram_project_name: projectName,
            api_key: apiKey,
            payram_base_url: baseUrl,
            updated_at: now,
          },
          { onConflict: "merchant_id" }
        );

      if (error) {
        const conflict =
          error.code === "23505" ||
          error.message.toLowerCase().includes("duplicate");
        return NextResponse.json(
          {
            error: conflict
              ? "This PayRam API key is already linked to another merchant. Each project key can only belong to one merchant."
              : error.message,
          },
          { status: conflict ? 409 : 500 }
        );
      }
    } else {
      const { data: existing } = await supabase
        .from("merchant_payram_credentials")
        .select("merchant_id")
        .eq("merchant_id", merchantId)
        .maybeSingle();

      if (!existing) {
        return NextResponse.json(
          { error: "api_key is required when creating new PayRam credentials" },
          { status: 400 }
        );
      }

      const { error } = await supabase
        .from("merchant_payram_credentials")
        .update({
          payram_project_id: projectId,
          payram_project_name: projectName,
          payram_base_url: baseUrl,
          updated_at: now,
        })
        .eq("merchant_id", merchantId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
