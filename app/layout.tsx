import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
// import { Providers } from './Providers'
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("./Providers"), {
  ssr: false
});


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
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
