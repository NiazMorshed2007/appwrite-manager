"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { config } from "@/config/config";
import { Component, FileText, Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
            <p className="text-[10px] text-muted-foreground/70">Collections</p>
          </AccordionTrigger>
          <AccordionContent>
            {config.groups.map((group, i) => (
              <Accordion
                key={i}
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full pl-2"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger
                    style={{ padding: "0px", paddingBottom: "12px" }}
                  >
                    <p className="flex items-center text-muted-foreground gap-2 text-sm">
                      <Component size={14} />
                      {group.name}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="pl-1">
                    {config.collections
                      .filter((c) => c.groupId === group.id)
                      .map((collection: any, i: number) => (
                        <Link
                          key={i}
                          href={`/app/collections/${collection.collectionId}`}
                          className={`flex w-full items-center text-sm transition-all ${
                            pathname ===
                            `/app/collections/${collection.collectionId}`
                              ? "bg-muted text-primary"
                              : "text-muted-foreground"
                          } hover:bg-muted rounded-md gap-2 p-1.5 px-1`}
                        >
                          <FileText size={14} />
                          <span className="text-sm">{collection.name}</span>
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}

            {config.collections
              .filter((c) => !c.groupId)
              .map((collection, i) => (
                <Link
                  key={i}
                  href={`/app/collections/${collection.collectionId}`}
                  className={`flex w-full items-center text-sm transition-all ${
                    pathname === `/app/collections/${collection.collectionId}`
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  } hover:bg-muted rounded-md gap-2 p-1.5 px-2`}
                >
                  <FileText size={14} />
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
