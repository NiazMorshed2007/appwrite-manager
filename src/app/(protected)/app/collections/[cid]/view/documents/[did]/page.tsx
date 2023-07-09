"use client";

import api from "@/appwrite/appwrite";
import ViewFile from "@/components/shared/view/ViewFile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findCollectionById } from "@/helpers/findCollectionById";
import { ICollection } from "@/interfaces/ICollection";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Models } from "appwrite";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const pathname = usePathname();
  const cid: string = pathname.split("/")[3];
  const did: string = pathname.split("/")[6];

  const [document, setDocument] = useState<Models.Document | null>(null);
  const [collection, setCollection] = useState<ICollection>();
  const [loading, setLoading] = useState(true);

  const fetchDocument = async () => {
    const document = await api.getDocument(cid, did);
    setDocument(document);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocument();
    setCollection(findCollectionById(cid));
  }, [pathname]);
  return (
    <div className="w-full">
      <div className="top sticky top-0 bg-background/80 backdrop-blur-sm z-[2] flex py-4 items-center justify-between gap-4 mb-7">
        <div className="flex items-center gap-4">
          <Link href={`/app/collections/${cid}`}>
            <div className="back-circle w-[30px] h-[30px] rounded-full bg-muted flex items-center justify-center">
              <ChevronLeft size={15} className="text-primary" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl  font-semibold flex items-center gap-3">
              {collection?.pages?.view?.title}
            </h1>{" "}
            <p className="text-sm text-muted-foreground">
              {collection?.pages?.view?.description}
            </p>
          </div>
        </div>

        <div className="actions flex items-center gap-4">
          <Link href={`/app/collections/${cid}/edit/documents/${did}`}>
            <Button size={"sm"} className="text-xs">
              <Pencil1Icon className="mr-2" /> Edit
            </Button>
          </Link>
          <Button size={"sm"} className="text-xs" variant={"destructive"}>
            <TrashIcon className="mr-2" /> Delete
          </Button>
        </div>
      </div>
      {!loading ? (
        <div className="flex flex-col py-4 gap-5">
          <div className="flex items-center justify-between p-2 px-2 bg-muted rounded-sm">
            <div className="left flex gap-1 items-center text-sm">
              <p className="text-xs text-muted-foreground/80">$id:</p>
              <h2 className=" opacity-80">{document && document["$id"]}</h2>
            </div>
            {/* <CopyIcon className="text-muted-foreground" /> */}
          </div>
          {collection?.columns?.map((column, _) => {
            return (
              <div key={_} className="flex flex-col gap-1">
                <p className="text-xs capitalize text-muted-foreground">
                  {column.label}
                </p>
                {document && (
                  <div>
                    {!column.type && <p>{document[column.key]}</p>}
                    {column.type === "enum" && (
                      <Badge className="capitalize">
                        {document[column.key]}
                      </Badge>
                    )}
                    {column.type === "file" && (
                      <ViewFile
                        className="w-[300px] h-[300px] object-cover rounded-md"
                        bucketId={column.bucketId}
                        fileId={document[column.key]}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[300px]">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
