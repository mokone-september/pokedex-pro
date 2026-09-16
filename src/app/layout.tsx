import "~/styles/globals.css";
import type { Metadata } from "next";
import { Box, Link } from "@chakra-ui/react";
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
          <Link
            href="#main-content"
            position="absolute"
            left="-9999px"
            top="auto"
            zIndex={9999}
            bg="blue.600"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            _focus={{
              left: "1rem",
              top: "1rem",
            }}
          >
            Skip to content
          </Link>
          <Box display="flex" flexDirection="column" minH="100dvh">
            <Navbar />
            <Box id="main-content" flex="1">
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
