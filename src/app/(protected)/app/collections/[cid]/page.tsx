"use client";

import api from "@/appwrite/appwrite";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { config } from "@/config/config";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TableSkeleton from "./components/table-skeleton";

export default function CollectionPage() {
  const pathname: string = usePathname();
  const cid: string = pathname.split("/")[3];
  const [data, setData] = useState<any>([]);
  const [staticCollection, setStaticCollection] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCollectionData = async () => {
    const data = await api.getDocuments(cid);
    setLoading(false);
    setData(data.documents);
  };

  const findCollectionById = (collections: any[]): any => {
    for (const collection of collections) {
      if (collection.type !== "group") {
        if (collection.collectionId && collection.collectionId === cid) {
          setStaticCollection(collection);
        }
      } else {
        const nestedCollection = findCollectionById(collection.collections);
        if (nestedCollection) {
          setStaticCollection(nestedCollection);
        }
      }
    }
  };

  const columns: ColumnDef<any>[] = [
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
      id: "$id",
      cell: ({ row }) => {
        return (
          <p className="text-xs text-muted-foreground">{row.original.$id}</p>
        );
      },
    },
    ...(staticCollection?.columns
      ? staticCollection.columns.map((column: any) => ({
          accessorKey: column.label as string,
          id: column.label as string,
          cell: ({ row }: { row: Row<any> }) => (
            <p>{row.original[column.key]}</p>
          ),
        }))
      : []),
  ];

  useEffect(() => {
    getCollectionData();
    findCollectionById(config.collections);
  }, [cid]);

  return (
    <div>
      <div className="pt-6 users-table">
        <h1 className="text-2xl mb-8 font-semibold">
          {staticCollection?.name}
        </h1>{" "}
        {loading ? (
          <TableSkeleton />
        ) : (
          <DataTable columns={columns} pagination={true} data={data} />
        )}
      </div>
    </div>
  );
}
