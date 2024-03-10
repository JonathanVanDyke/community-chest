import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Sidebar from "./ui/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Community Chest",
  description: "",
  icons: [{ rel: "icon", url: "/color-wood-chest.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Astoria Community Chest</title>
        <meta name="description" content="Astoria Community Chest" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <main className="to-aqua-10 flex h-full flex-col bg-gradient-to-b from-aqua-950 sm:flex-row">
            <Sidebar />
            <div className="to-aqua-10 flex min-h-screen w-full flex-col items-center justify-center overflow-scroll bg-gradient-to-b from-aqua-950 p-5 text-white">
              {children}
            </div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
