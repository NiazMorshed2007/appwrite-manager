"use client";

import api from "@/appwrite/appwrite";
import ViewFile from "@/components/shared/view/ViewFile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findCollectionById } from "@/helpers/findCollectionById";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { ICollection } from "@/interfaces/ICollection";
import { IColumn } from "@/interfaces/IColumn";
import {
  selectCurrentPage,
  selectLimit,
  selectTotal,
  setCurrentPage,
  setLimit,
  setTotal,
} from "@/redux/appSlice";
import { selectCollection, setCollection } from "@/redux/collectionSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Models } from "appwrite";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import TableSkeleton from "./components/table-skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function CollectionPage() {
  const pathname: string = usePathname();
  const cid: string = pathname.split("/")[3];

  const { toast } = useToast();

  const [data, setData] = useState<Models.Document[]>([]);

  const collection: ICollection = useAppSelector(selectCollection);

  const [loading, setLoading] = useState<boolean>(true);
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const total = useAppSelector(selectTotal);
  const limit = useAppSelector(selectLimit);
  const currentPage: number = useAppSelector(selectCurrentPage);

  const dispatch: Dispatch = useAppDispatch();

  const handleDelete = async (did: string) => {
    setIsDeleting(true);
    try {
      await api.deleteDocument(cid, did);
      getCollectionData();
      toast({ title: "Document Deleted" });
      setDeleteDialogOpen(false);
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Can't delete document",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getCollectionData = async () => {
    try {
      setTableLoading(true);
      const data = await api.getDocuments(
        cid,
        limit,
        (currentPage - 1) * limit
      );
      setLoading(false);
      setTableLoading(false);
      dispatch(setTotal(data.total));
      setData(data.documents);
    } catch (err) {
      console.log(err);
    }
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
            <Link href={`/app/collections/${cid}/view/documents/${data.$id}`}>
              <Button size="sm" variant="secondary" className="p-1 px-2">
                <Eye size={14} className="text-primary" />
              </Button>
            </Link>
            {collection?.isEditable !== undefined && !collection?.isEditable ? (
              <></>
            ) : (
              <Link href={`/app/collections/${cid}/edit/documents/${data.$id}`}>
                <Button size="sm" variant="ghost" className="p-1 px-2">
                  <Pencil size={14} className="text-primary" />
                </Button>
              </Link>
            )}
            <Dialog
              open={deleteDialogOpen}
              onOpenChange={() => {
                setDeleteDialogOpen(!deleteDialogOpen);
              }}
            >
              <DialogTrigger>
                <Button className="p-1 px-2" size={"sm"} variant="ghost">
                  <Trash size={14} className="text-red-400" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="text-red-500">
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  This action is irreversible. You will not be able to recover
                </DialogDescription>
                <div className="flex items-center gap-4 justify-end">
                  <DialogClose>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button
                    disabled={isDeleting}
                    onClick={() => {
                      handleDelete(data.$id);
                    }}
                    variant={"destructive"}
                  >
                    <Trash size={14} className="mr-3" />
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
    ...(collection?.columns
      ? collection.columns.map((column: IColumn) => ({
          accessorKey: column.key as string,
          header: column.label as string,
          enableHiding: column.enableHiding as boolean,
          cell: ({ row }: { row: Row<any> }) => (
            <>
              {!column.type && <p>{row.original[column.key]}</p>}
              {column.type === "enum" && (
                <Badge>{row.original[column.key]}</Badge>
              )}
              {column.type === "file" && (
                <ViewFile
                  className="w-[30px] h-[30px]"
                  bucketId={column.bucketId}
                  fileId={row.original[column.key]}
                />
              )}
            </>
          ),
        }))
      : []),
  ];

  useEffect(() => {
    getCollectionData();
  }, [limit, currentPage]);

  useEffect(() => {
    const collection: ICollection = findCollectionById(cid)!;
    dispatch(setCollection(collection));

    return () => {
      dispatch(setTotal(0));
      dispatch(setCurrentPage(1));
      dispatch(setLimit(10));
    };
  }, [cid]);

  return (
    <div>
      <div className="pt-6 users-table">
        <h1 className="text-2xl mb-1 font-semibold flex items-center gap-3">
          {collection?.name}
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
            searchColumn={collection?.searchColumn!}
            columns={columns}
            pagination={true}
            data={data}
          />
        )}
      </div>
    </div>
  );
}
