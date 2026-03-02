import "@/styles/globals.css";

import type { Metadata } from "next";
import Head from "next/head";
import Header from "@/components/header";
import { Auth_Provider } from "@/components/auth/provider";

export const metadata: Metadata = {
  title: "Beand & co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Auth_Provider>
          <Header />
          {children}
        </Auth_Provider>
      </body>
    </html>
  );
}
