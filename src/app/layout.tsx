import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Sidebar from "./_components/layout/Sidebar";

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
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <main className="h-100 to-aqua-10 flex flex-row items-center justify-between bg-gradient-to-b from-aqua-950">
            {true && (
              <>
                <Sidebar />
                <div className="w-[360px]" />
              </>
            )}
            <div className="to-aqua-10 flex min-h-screen w-full flex-col items-center justify-center overflow-scroll bg-gradient-to-b from-aqua-950 text-white">
              {children}
            </div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
