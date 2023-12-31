"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getShortcutKey } from "@/helpers/getShortcutKey";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ICollection } from "@/interfaces/ICollection";
import { selectCollection } from "@/redux/collectionSlice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState<boolean>(false);
  const filterShortcutKey = getShortcutKey("filter");
  const collection: ICollection = useAppSelector(selectCollection);

  const tableViewShortcuts = (e: KeyboardEvent) => {
    if (e.key === filterShortcutKey && e.ctrlKey) {
      e.preventDefault();
      setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", tableViewShortcuts);
    return () => {
      window.removeEventListener("keydown", tableViewShortcuts);
    };
  }, []);
  return (
    <div className="flex items-center gap-3">
      <Link href={`/app/collections/${collection.collectionId}/new`}>
        <Button size={"sm"} className="text-xs">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </Link>
      <DropdownMenu
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
