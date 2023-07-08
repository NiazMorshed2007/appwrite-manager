import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectCurrentPage,
  selectPageCount,
  setCurrentPage,
  setLimit,
} from "@/redux/appSlice";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const dispatch = useAppDispatch();
  const pagesCount: number = useAppSelector(selectPageCount);
  const currentPage: number = useAppSelector(selectCurrentPage);
  const [firstPage, setFirstPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);

  const calculatePages = () => {
    setLastPage(pagesCount);

    let middlePages = [];
    middlePages.push(currentPage - 1);
    middlePages.push(currentPage + 1);
    middlePages.push(currentPage);
    middlePages = middlePages.filter((p) => p > firstPage && p < lastPage);
    middlePages = middlePages.sort((a, b) => (a < b ? -1 : 1));

    const updatedPages = [];
    updatedPages.push(firstPage);
    if (middlePages[0] !== firstPage + 1) {
      updatedPages.push(-1);
    }
    updatedPages.push(...middlePages);
    if (middlePages[middlePages.length - 1] !== lastPage - 1) {
      updatedPages.push(-1);
    }
    updatedPages.push(lastPage);

    if (middlePages.length === 0) {
      updatedPages.splice(1, 0, lastPage);
    }

    if (firstPage === lastPage) {
      updatedPages.splice(1, 0, firstPage);
    }

    setPages(updatedPages);
  };

  useEffect(() => {
    calculatePages();
    console.log(pages);
  }, [firstPage, lastPage, currentPage, pagesCount]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              dispatch(setLimit(Number(value)));
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          {pages &&
            pages.map((page, i) => (
              <Button
                key={i}
                variant="outline"
                className={`h-8 w-8 p-0 ${page === -1 ? "opacity-50" : ""}}`}
                style={{
                  border: page === -1 ? "none" : "",
                }}
                onClick={() => {
                  dispatch(setCurrentPage(page));
                }}
                disabled={currentPage === page || page === -1}
              >
                <span className="sr-only">Go to page page</span>
                <span
                  className={`${
                    currentPage === page ? "bg-primary/20 text-primary" : ""
                  } h-8 w-8 flex items-center justify-center rounded-m
                hover:bg-primary/10 transition-colors duration-200`}
                >
                  {page === -1 ? "..." : page}
                </span>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
