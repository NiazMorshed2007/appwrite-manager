"use client";

import { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-facted-filter";
import { useEffect, useRef } from "react";
import { config } from "@/config/config";
import { getShortcutKey } from "@/helpers/getShortcutKey";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn: string;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchShortcutKey: string = getShortcutKey("search");

  const toolbalShortcuts = (e: KeyboardEvent) => {
    if (e.key === searchShortcutKey && e.ctrlKey) {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", toolbalShortcuts);
    return () => {
      window.removeEventListener("keydown", toolbalShortcuts);
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchColumn && (
          <div className="relative">
            <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={searchInputRef}
              placeholder={`Search for ${searchColumn}...`}
              value={
                (table.getColumn(searchColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(searchColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] pl-8 lg:w-[250px]"
            />
          </div>
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={[
              {
                label: "Open",
                value: "open",
              },
            ]}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={[
              {
                label: "High",
                value: "high",
              },
              {
                label: "Medium",
                value: "medium",
              },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
