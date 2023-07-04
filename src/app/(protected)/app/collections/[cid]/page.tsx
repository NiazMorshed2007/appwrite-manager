"use client";

import api from "@/appwrite/appwrite";
import { Button } from "@/components/ui/button";
import { config } from "@/config/config";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TableSkeleton from "./components/table-skeleton";
import { DataTable } from "./components/data-table";

export default function CollectionPage() {
  const pathname: string = usePathname();
  const cid: string = pathname.split("/")[3];
  const [data, setData] = useState<any>([]);
  const [staticCollection, setStaticCollection] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  const getCollectionData = async () => {
    const data = await api.getDocuments(cid);
    setLoading(false);
    setTotal(data.total);
    setData(data.documents);
  };

  const findCollectionById = (): void => {
    for (const collection of config.collections) {
      if (collection?.collectionId === cid) {
        setStaticCollection(collection);
      }
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "Actions",
      id: "actions",
      enableHiding: false,
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
            {staticCollection?.isEditable !== undefined &&
            !staticCollection?.isEditable ? (
              <></>
            ) : (
              <Button size="sm" variant="ghost" className="p-1 px-2">
                <Pencil
                  onClick={() => alert(data)}
                  size={14}
                  className="text-primary"
                />
              </Button>
            )}
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
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <p className="text-xs text-muted-foreground">{row.original.$id}</p>
        );
      },
    },
    ...(staticCollection?.columns
      ? staticCollection.columns.map((column: any) => ({
          accessorKey: column.key as string,
          header: column.label as string,
          enableHiding: column.enableHiding as boolean,
          cell: ({ row }: { row: Row<any> }) => (
            <p className={column.className}>{row.original[column.key]}</p>
          ),
        }))
      : []),
  ];

  useEffect(() => {
    getCollectionData();
    findCollectionById();
  }, [cid, config]);

  return (
    <div>
      <div className="pt-6 users-table">
        <h1 className="text-2xl mb-1 font-semibold flex items-center gap-3">
          {staticCollection?.name}
          <span className="text-xs bg-muted p-1 px-2 font-normal text-foreground rounded-full">
            {total} Documents
          </span>
        </h1>{" "}
        <p className="text-muted-foreground mb-6 text-sm">
          Here is all the documents associated with this collection.
        </p>
        {loading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            searchColumn={staticCollection?.searchColumn}
            columns={columns}
            pagination={true}
            data={data}
          />
        )}
      </div>
    </div>
  );
}
