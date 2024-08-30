import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { Providers } from './Providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Laiba Treders",
    template: "%s | Laiba Treders"
  },
  description: "A Shop Managemenet System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          < Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
