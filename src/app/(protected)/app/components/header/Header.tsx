"use client";

import SearchCommandBox from "@/components/shared/SearchCommandBox";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getShortcutKey } from "@/helpers/getShortcutKey";
import { ToggleTheme } from "@/theme/ToggleTheme";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Keyboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { logout } from "@/lib/services/auth.service";

const DashboardHeader = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const searchBoxShortcutKey: string = getShortcutKey("searchbox");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === searchBoxShortcutKey) {
        e.preventDefault();
        setSearchBoxOpen((searchBoxOpen) => !searchBoxOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <header className="flex sticky top-0 items-center justify-between px-7 py-2 border-b">
      <SearchCommandBox open={searchBoxOpen} setOpen={setSearchBoxOpen} />
      <div className="left">
        <BreadCrumb />
      </div>
      <div className="right flex items-center gap-4">
        <Link
          className="text-sm text-muted-foreground hover:text-foreground"
          href="/docs"
        >
          Docs
        </Link>
        <Keyboard size={15} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setSearchBoxOpen(true)}
                variant="ghost"
                size="sm"
                className="rounded-full p-0 w-[34px] h-[34px]"
              >
                <MagnifyingGlassIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ctrl + {searchBoxShortcutKey}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ToggleTheme />
        <DropdownMenu>
          <DropdownMenuTrigger className=" outline-none">
            <Avatar className="w-[30px] h-[30px] bg-muted border border-secondary-foreground/10">
              <img
                src="https://vercel.com/api/www/avatar/OGtI6p0A6Ct2GNVzrW7zqPgN?&s=160"
                alt=""
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>
              <LogOut size={14} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
