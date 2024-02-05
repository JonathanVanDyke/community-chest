import { ScrollArea } from "~/app/ui/ScrollArea";
import { SidebarNav } from "../../ui/SidebarNav";

import Image from "next/image";

import chestIcon from "../../../../public/chestIcon.svg";

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

const Sidebar = () => (
  <div className="bg-aqua-100 border-aqua-90 text-aqua-950 fixed top-0 flex h-full w-72">
    <ScrollArea className="h-full w-full py-6  lg:py-8">
      <Logo />
      <br />
      <SidebarNav items={sideBarItems} />
    </ScrollArea>
  </div>
);

const Logo = () => (
  <a href={"/"} className="align-center flex items-center justify-center pr-6">
    <Image priority width={80} color={"aqua"} src={chestIcon} alt="chest" />
    <div className="align-center text-aqua-950 m-3 flex flex-col items-center justify-center font-black">
      <div>COMMUNITY</div>
      <div>CHEST</div>
    </div>
  </a>
);

export default Sidebar;
