import "~/styles/globals.css";

import type { Metadata } from "next";

import { Providers } from "~/app/components/providers";

export const metadata: Metadata = {
  title: "Pokédex Pro",
  description: "A modern Pokédex built with Next.js and PokéAPI.",
  icons: {
    icon: "/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
