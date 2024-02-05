import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ScrollArea } from "./ui/ScrollArea";
import { SidebarNav } from "./ui/SidebarNav";

import chestIcon from "../../public/chestIcon.svg";

import Image from "next/image";
import { Separator } from "./ui/Separator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <main className="h-100 from-aqua-950 to-aqua-10 flex flex-row items-center justify-between bg-gradient-to-b">
            <div className="bg-aqua-100 border-aqua-90 text-aqua-950 fixed top-0 flex h-full w-72 border-r-2 border-solid">
              <ScrollArea className="h-full w-full py-6 pr-6 lg:py-8">
                <a
                  href={"/"}
                  className="align-center flex items-center justify-center"
                >
                  <Image
                    priority
                    width={80}
                    color={"aqua"}
                    src={chestIcon}
                    alt="chest"
                  />
                  <div className="align-center text-aqua-950 m-3 flex flex-col items-center justify-center font-black">
                    <div>COMMUNITY</div>
                    <div>CHEST</div>
                  </div>
                </a>
                <br />
                <Separator className="m-4 bg-black " />
                <SidebarNav
                  items={[
                    {
                      title: "Getting Started",
                      items: [
                        {
                          title: "T3-example-page",
                          href: "/t3-example-page",
                          items: [],
                        },
                      ],
                    },
                    {
                      title: "Components",
                      items: [
                        {
                          title: "Command",
                          href: "/docs/components/command",
                          items: [],
                        },
                        {
                          title: "Tooltip",
                          href: "/docs/components/tooltip",
                          items: [],
                        },
                      ],
                    },
                  ]}
                />
              </ScrollArea>
            </div>
            <div className="w-96" />
            <div className="from-aqua-950 to-aqua-10 flex min-h-screen w-full flex-col items-center justify-center overflow-scroll bg-gradient-to-b text-white">
              {children}
            </div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
