import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

type ProfileEmbed = { email: string; company_name: string | null };

type TxRow = {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  status: string;
  merchant_id: string;
  customer_email: string | null;
  payment_rail: string | null;
  provider_order_id: string | null;
  payram_reference_id: string | null;
  payment_url: string | null;
  profiles: ProfileEmbed | ProfileEmbed[] | null;
};

function pickProfile(
  p: ProfileEmbed | ProfileEmbed[] | null | undefined
): ProfileEmbed | null {
  if (!p) return null;
  return Array.isArray(p) ? (p[0] ?? null) : p;
}

export default async function AdminTransactionsPage(): Promise<ReactNode> {
  const supabase = await createClient();
  await supabase.auth.getUser();

  const { data: rows, error } = await supabase
    .from("transactions")
    .select(
      `id, created_at, amount, currency, status, merchant_id, customer_email,
       payment_rail, provider_order_id, payram_reference_id, payment_url,
       profiles ( email, company_name )`
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-600">
        Could not load transactions: {error.message}
      </div>
    );
  }

  const list = (rows ?? []) as TxRow[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          All transactions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every payment attempt across merchants (newest first, up to 500).
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Time
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Merchant
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Amount
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Rail
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Customer
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Reference
              </th>
              <th className="px-3 py-3 font-medium text-muted-foreground">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-12 text-center text-muted-foreground"
                >
                  No transactions yet.
                </td>
              </tr>
            ) : (
              list.map((t) => {
                const ref =
                  t.provider_order_id ?? t.payram_reference_id ?? "—";
                const prof = pickProfile(t.profiles);
                const merchantLabel =
                  prof?.company_name?.trim() ||
                  prof?.email ||
                  t.merchant_id.slice(0, 8);
                return (
                  <tr key={t.id} className="hover:bg-muted/20">
                    <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                    <td className="max-w-[200px] px-3 py-2.5">
                      <p className="truncate font-medium text-foreground">
                        {merchantLabel}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {prof?.email ?? t.merchant_id}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 font-medium">
                      ${Number(t.amount).toFixed(2)} {t.currency}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={
                          t.status === "completed"
                            ? "text-emerald-600"
                            : t.status === "failed"
                              ? "text-red-500"
                              : "text-amber-600"
                        }
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                      {t.payment_rail ?? "—"}
                    </td>
                    <td className="max-w-[160px] truncate px-3 py-2.5 text-muted-foreground">
                      {t.customer_email ?? "—"}
                    </td>
                    <td className="max-w-[140px] truncate px-3 py-2.5 font-mono text-xs text-muted-foreground">
                      {ref}
                    </td>
                    <td className="px-3 py-2.5">
                      {t.payment_url ? (
                        <Link
                          href={t.payment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-accent hover:underline"
                        >
                          Open
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
