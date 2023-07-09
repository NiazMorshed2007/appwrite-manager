"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center gap-[.1em]">
          <Button size="sm" variant="secondary" className="p-1 px-2">
            <Eye
              onClick={() => alert(data)}
              size={14}
              className="text-primary"
            />
          </Button>
          <Button size="sm" variant="ghost" className="p-1 px-2">
            <Pencil
              onClick={() => alert(data)}
              size={14}
              className="text-primary"
            />
          </Button>
          <Button
            className="p-1 px-2"
            size={"sm"}
            variant="ghost"
            onClick={() => alert("Will Delete" + data)}
          >
            <Trash size={14} className="text-red-400" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "$id",
    header: "$id",
    cell: ({ row }) => {
      return (
        <p className="text-xs text-muted-foreground">{row.original.$id}</p>
      );
    },
  },
];
