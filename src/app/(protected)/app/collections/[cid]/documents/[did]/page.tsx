"use client";

import api from "@/appwrite/appwrite";
import { findCollectionById } from "@/helpers/findCollectionById";
import { ICollection } from "@/interfaces/ICollection";
import { Models } from "appwrite";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const pathname = usePathname();
  const cid: string = pathname.split("/")[3];
  const did: string = pathname.split("/")[5];

  const [document, setDocument] = useState<Models.Document | null>(null);
  const [staticCollection, setStaticCollection] = useState<ICollection>();

  const fetchDocument = async () => {
    const document = await api.getDocument(cid, did);
    setDocument(document);
  };
  useEffect(() => {
    fetchDocument();
    setStaticCollection(findCollectionById(cid));
  }, [pathname]);
  return (
    <div className="w-full">
      <div className="top flex items-center gap-4 mb-7">
        <Link href={`/app/collections/${cid}`}>
          <div className="back-circle w-[30px] h-[30px] rounded-full bg-muted flex items-center justify-center">
            <ChevronLeft size={15} className="text-primary" />
          </div>
        </Link>
        <h1 className="text-2xl  font-semibold flex items-center gap-3">
          Document Name
        </h1>{" "}
      </div>
      <div className="flex flex-col w-1/2 border-r overflow-x-hidden py-4 gap-5">
        {staticCollection?.columns?.map((column) => {
          return (
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{column.label}</p>
              <p className="text-sm text-secondary-foreground">
                {document && document[column.key]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentPage;
