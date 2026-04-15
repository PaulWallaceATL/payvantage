import { AuthSplitShell } from "@/components/auth-split-shell";
import { ThemeSwitch } from "@/components/theme-switch";
import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <>
      <ThemeSwitch />
      <AuthSplitShell>{children}</AuthSplitShell>
    </>
  );
}
