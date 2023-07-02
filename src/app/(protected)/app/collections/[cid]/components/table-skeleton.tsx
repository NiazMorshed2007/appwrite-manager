import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = () => {
  const commonNodes = (
    <>
      <Skeleton className="w-[120px] h-[15px] rounded-full"></Skeleton>
      <Skeleton className="w-[220px] h-[15px] rounded-full"></Skeleton>
      <Skeleton className="w-[120px] h-[15px] rounded-full"></Skeleton>
      <Skeleton className="w-[120px] h-[15px] rounded-full"></Skeleton>
      <Skeleton className="w-[90px] h-[15px] rounded-full"></Skeleton>
    </>
  );
  return (
    <div className="w-full rounded-md border">
      <div className="py-3 px-5 bg-muted flex items-center justify-between">
        {commonNodes}
      </div>
      <div className="datas">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="py-4 px-5 border-b flex items-center justify-between"
          >
            {commonNodes}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
