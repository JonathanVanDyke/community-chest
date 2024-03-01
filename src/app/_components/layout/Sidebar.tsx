import { ScrollArea } from "~/app/ui/ScrollArea";
import { SidebarNav } from "../../ui/SidebarNav";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

import Image from "next/image";
import svgColorFilter from "~/styles/svgColorFilters";

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
  return (
    <>
      <div className="fixed left-2 top-2 z-50 h-24 sm:hidden">
        <Sheet>
          <SheetTrigger>
            <Image
              src="/icons/menu.svg"
              alt="menu"
              width="40"
              height="40"
              style={{
                filter: svgColorFilter.white,
              }}
              className="mt-3 h-8 w-8 xs:h-10 xs:w-10"
            />
          </SheetTrigger>
          <SheetContent side="left" className="w-full border-none p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden w-3/12 min-w-60 sm:flex">
        <SidebarContent />
      </div>
    </>
  );
};

const SidebarContent = () => (
  <div className="border-aqua-90 flex h-full w-full bg-aqua-100 text-aqua-950">
    <ScrollArea className="h-full w-full py-6 lg:py-8">
      <Logo />
      <br />
      <SidebarNav items={sideBarItems} />
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
        filter: svgColorFilter.aqua[950],
      }}
    />
    <div className="align-center m-3 flex flex-col items-center justify-center font-black text-aqua-950">
      <div>COMMUNITY</div>
      <div>CHEST</div>
    </div>
  </a>
);

export default Sidebar;
