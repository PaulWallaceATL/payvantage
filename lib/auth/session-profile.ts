import type { SupabaseClient } from "@supabase/supabase-js";

export type SessionProfile = {
  role: string;
  onboarded: boolean;
  approved: boolean;
};

function parseRpcPayload(data: unknown): SessionProfile | null {
  if (data == null || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  if (typeof o["role"] !== "string") return null;
  return {
    role: o["role"],
    onboarded: Boolean(o["onboarded"]),
    approved: Boolean(o["approved"]),
  };
}

/**
 * Reads the signed-in user's profile row for routing (admin vs merchant).
 * Prefer RPC `get_session_profile` (SECURITY DEFINER) so RLS cannot hide `role`.
 * Falls back to a normal select if the RPC is not installed yet.
 */
export async function getSessionProfileForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<SessionProfile | null> {
  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "get_session_profile"
  );

  if (!rpcError && rpcData != null) {
    const parsed = parseRpcPayload(rpcData);
    if (parsed) return parsed;
  }

  const { data: row, error: rowError } = await supabase
    .from("profiles")
    .select("role, onboarded, approved")
    .eq("id", userId)
    .maybeSingle();

  if (rowError || !row) return null;

  return {
    role: String(row.role ?? ""),
    onboarded: Boolean(row.onboarded),
    approved: Boolean(row.approved),
  };
}

export function isAdminRole(role: string | null | undefined): boolean {
  return (role ?? "").trim().toLowerCase() === "admin";
}
