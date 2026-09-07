import "~/styles/globals.css";
import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { Providers } from "~/app/components/providers";
import Navbar from "~/layout/Navbar";
import Footer from "~/layout/Footer";

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
        <Providers>
          <Box display="flex" flexDirection="column" minH="100dvh">
            <Navbar />
            <Box flex="1">{children}</Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
