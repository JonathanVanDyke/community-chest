"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../lib/utils";
import { Separator } from "./Separator";

export interface SidebarNavProps {
  items: any[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 px-2 py-1 text-sm font-semibold">{item.title}</h4>
          {item?.items?.length && (
            <>
              <Separator className="bg-aqua-500 " />
              <SidebarNavItems items={item.items} pathname={pathname} />
            </>
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface SidebarNavItemsProps {
  items: any[];
  pathname: string | null;
}

export function SidebarNavItems({ items, pathname }: SidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max font-['helvetica'] text-base">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <>
            <Link
              key={index}
              href={item.href}
              className={cn(
                ` group flex h-32 w-full w-full  items-center px-2 py-1 pl-20 hover:text-white`,
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href
                  ? "text-foreground from-aqua-950 to-aqua-800 hover:bg-aqua-900  bg-gradient-to-b font-black text-white "
                  : "text-muted-foreground hover:bg-aqua-800",
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              {item.title}
              {item.label && (
                <span className="ml-2  bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </Link>
            <Separator className="bg-aqua-500 " />
          </>
        ) : (
          <span
            key={index}
            className={cn(
              "text-muted-foreground flex w-full cursor-not-allowed items-center  p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
            {item.label && (
              <span className="bg-muted text-muted-foreground ml-2  px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null;
}
