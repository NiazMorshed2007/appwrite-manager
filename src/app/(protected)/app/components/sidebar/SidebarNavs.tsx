"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { config } from "@/config/config";
import { FileIcon } from "@radix-ui/react-icons";

interface NavInterface {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const SidebarNavs: React.FC = () => {
  const pathname: string = usePathname();

  const navs: NavInterface[] = [
    {
      name: "Overview",
      icon: <Home size={14} />,
      link: "/app",
    },
    {
      name: "Profile",
      icon: <User size={14} />,
      link: "/app/profile",
    },
    {
      name: "Settings",
      icon: <Settings size={14} />,
      link: "/app/settings",
    },
  ];

  return (
    <nav className="py-8 w-full rounded-xl flex flex-col gap-1">
      {navs.map((nav, i) => (
        <Link
          key={i}
          href={nav.link}
          className={`flex w-full items-center text-sm transition-all ${
            pathname === nav.link
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          } hover:bg-muted rounded-md gap-2 p-1.5 px-2`}
        >
          {nav.icon}
          <span className="text-sm">{nav.name}</span>
        </Link>
      ))}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger>
            <p className="text-xs text-muted-foreground">Collections</p>
          </AccordionTrigger>
          <AccordionContent className="pl-1">
            {config.collections.map((collection, i) => (
              <Link
                key={i}
                href={`/app/collections`}
                className={`flex w-full items-center text-sm transition-all ${
                  pathname === "app/collections/:id"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                } hover:bg-muted rounded-md gap-2 p-1.5 px-2`}
              >
                <FileIcon />
                <span className="text-sm">{collection.name}</span>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};

export default SidebarNavs;
