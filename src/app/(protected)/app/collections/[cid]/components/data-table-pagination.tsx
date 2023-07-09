import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { ICollection } from "@/interfaces/ICollection";
import {
  selectCurrentPage,
  selectPageCount,
  selectTotal,
  setCurrentPage,
  setLimit,
} from "@/redux/appSlice";
import { selectCollection } from "@/redux/collectionSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const dispatch = useAppDispatch();

  const collection: ICollection = useAppSelector(selectCollection);

  const total = useAppSelector(selectTotal);
  const totalPages: number = useAppSelector(selectPageCount);
  const currentPage: number = useAppSelector(selectCurrentPage);
  const [pages, setPages] = useState<any[]>([]);

  function pagination(page: number, total: number) {
    const pagesShown = 5;

    const start = Math.max(
      1,
      Math.min(page - Math.floor((pagesShown - 3) / 2), total - pagesShown + 2)
    );

    const end = Math.min(
      total,
      Math.max(page + Math.floor((pagesShown - 2) / 2), pagesShown - 1)
    );

    return [
      ...(start > 2 ? [1, "..."] : start > 1 ? [1] : []),
      ...Array.from({ length: end + 1 - start }, (_, i) => i + start),
      ...(end < total - 1 ? ["...", total] : end < total ? [total] : []),
    ];
  }

  useEffect(() => {
    setPages(pagination(currentPage, totalPages));
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              if (currentPage * Number(value) > total)
                dispatch(setCurrentPage(1));
              dispatch(setLimit(Number(value)));
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {collection.settings?.limitOptions ? (
                <>
                  {collection?.settings?.limitOptions?.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <>
                  {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              dispatch(setCurrentPage(currentPage - 1));
            }}
            disabled={currentPage <= 1}
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Prev
          </Button>
          {pages.map((page, index) => (
            <div key={index} className="pagination-item">
              {typeof page === "number" ? (
                <Button
                  variant="outline"
                  disabled={currentPage === page}
                  className={`h-8 w-8 p-0 ${page === -1 ? "opacity-50" : ""}}`}
                  style={{
                    border: page === -1 ? "none" : "",
                  }}
                  onClick={() => {
                    dispatch(setCurrentPage(page));
                  }}
                >
                  <span className="text">{page}</span>
                </Button>
              ) : (
                <div className="div is-text">
                  <span className="icon">...</span>
                </div>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() => {
              dispatch(setCurrentPage(currentPage + 1));
            }}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
