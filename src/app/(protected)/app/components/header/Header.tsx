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
import { ToggleTheme } from "@/theme/ToggleTheme";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const DashboardHeader = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
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
      <div className="left text-xs text-muted-foreground">
        <h2>Overview</h2>
      </div>
      <div className="right flex items-center gap-4">
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
              <p>Ctrl + K</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ToggleTheme />
        <DropdownMenu>
          <DropdownMenuTrigger className=" outline-none">
            <Avatar className="w-[30px] h-[30px] bg-muted border border-secondary-foreground/10"></Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
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
