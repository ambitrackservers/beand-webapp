"use client";

import { SessionProvider } from "next-auth/react";

export function Auth_Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
