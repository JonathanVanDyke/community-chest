"use client";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

import { ScrollArea } from "~/app/ui/ScrollArea";
import { SidebarNav } from "./SidebarNav";
import { useState } from "react";
import svgColorFilters from "~/styles/svgColorFilters";

const sideBarItems = [
  {
    items: [
      {
        title: "Home",
        href: "/",
        items: [],
      },
      {
        title: "Item Finder",
        href: "/item-finder",
        items: [],
      },
      {
        title: "T3-example-page",
        href: "/t3-example-page",
        items: [],
      },
    ],
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="sticky left-0 top-0 z-10 h-fit w-full sm:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="xs:h-16 flex h-24 w-full items-center border-b-2 border-slate-900 bg-gradient-to-b from-aqua-800 to-aqua-950 px-5">
            <SheetTrigger className="mr-4 h-8 w-8 grow-0">
              <Image
                src="/icons/menu.svg"
                alt="menu"
                width="40"
                height="40"
                style={{
                  filter: svgColorFilters.white,
                }}
              />
            </SheetTrigger>
            <h1 className="-ml-8 w-full px-8 text-center text-3xl text-white">
              Community Chest
            </h1>
          </div>
          <SheetContent side="left" className="w-full border-none p-0">
            <SidebarContent onNavItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden min-w-60 sm:flex">
        <SidebarContent />
      </div>
    </>
  );
};

const SidebarContent = ({
  onNavItemClick,
}: {
  onNavItemClick?: () => void;
}) => (
  <div className="border-aqua-90 flex h-full w-full bg-aqua-100 text-aqua-950">
    <ScrollArea className="h-full w-full py-6 lg:py-8">
      <Logo />
      <br />
      <SidebarNav items={sideBarItems} onNavItemClick={onNavItemClick} />
    </ScrollArea>
  </div>
);

const Logo = () => (
  <a href={"/"} className="align-center flex items-center justify-center p-6">
    <Image
      src="/chestIcon.svg"
      alt="chest"
      width="80"
      height="80"
      style={{
        filter: svgColorFilters.aqua[950],
      }}
    />
    <div className="align-center m-3 flex flex-col items-center justify-center font-black text-aqua-950">
      <div>COMMUNITY</div>
      <div>CHEST</div>
    </div>
  </a>
);

export default Sidebar;
