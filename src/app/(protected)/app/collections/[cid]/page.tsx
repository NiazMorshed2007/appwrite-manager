"use client";

import api from "@/appwrite/appwrite";
import { Button } from "@/components/ui/button";
import { config } from "@/config/config";
import { findCollectionById } from "@/helpers/findCollectionById";
import { ICollection } from "@/interfaces/ICollection";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import TableSkeleton from "./components/table-skeleton";
import { Models } from "appwrite";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectCurrentPage,
  selectLimit,
  selectTotal,
  setCurrentPage,
  setLimit,
  setTotal,
} from "@/redux/appSlice";
import { Dispatch } from "@reduxjs/toolkit";

export default function CollectionPage() {
  const pathname: string = usePathname();
  const cid: string = pathname.split("/")[3];

  const [data, setData] = useState<Models.Document[]>([]);

  const [staticCollection, setStaticCollection] = useState<ICollection>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const total = useAppSelector(selectTotal);
  const limit = useAppSelector(selectLimit);
  const currentPage: number = useAppSelector(selectCurrentPage);

  const dispatch: Dispatch = useAppDispatch();

  const getCollectionData = async () => {
    setTableLoading(true);
    const data = await api.getDocuments(cid, limit, (currentPage - 1) * limit);
    setLoading(false);
    setTableLoading(false);
    dispatch(setTotal(data.total));
    setData(data.documents);
  };

  const columns: ColumnDef<Models.Document>[] = [
    {
      accessorKey: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex items-center gap-[.1em]">
            <Link href={`/app/collections/${cid}/documents/${data.$id}`}>
              <Button size="sm" variant="secondary" className="p-1 px-2">
                <Eye size={14} className="text-primary" />
              </Button>
            </Link>
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
            <p className={column.className}>
              {column.type === "date" ? (
                <>{new Date(row.original[column.key]).toLocaleString()}</>
              ) : (
                <>{row.original[column.key]}</>
              )}
            </p>
          ),
        }))
      : []),
  ];

  useEffect(() => {
    getCollectionData();
    console.log("hey I'm fetching data");
  }, [limit, currentPage]);

  useEffect(() => {
    setStaticCollection(findCollectionById(cid));

    return () => {
      dispatch(setTotal(0));
      dispatch(setCurrentPage(1));
    };
  }, [cid]);

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
            loading={tableLoading}
            searchColumn={staticCollection?.searchColumn!}
            columns={columns}
            pagination={true}
            data={data}
          />
        )}
      </div>
    </div>
  );
}
