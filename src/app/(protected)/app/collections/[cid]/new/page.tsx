"use client";

import api from "@/appwrite/appwrite";
import ViewFile from "@/components/shared/view/ViewFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { findCollectionById } from "@/helpers/findCollectionById";
import { ICollection } from "@/interfaces/ICollection";
import { IColumn } from "@/interfaces/IColumn";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateDocument = () => {
  const pathname = usePathname();
  const cid: string = pathname.split("/")[3];

  const { toast } = useToast();
  const router = useRouter();

  const [collection, setCollection] = useState<ICollection>();
  const [data, setData] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    bucketId: string,
    key: string
  ) => {
    try {
      const selectedFile = e.target.files ? e.target.files[0] : null;
      const file = await api.createFile(bucketId, selectedFile as File);
      setData((prev: any) => ({ ...prev, [key]: file.$id }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const document = await api.createDocument(cid, data);
      toast({
        title: "Document created successfully",
      });
      router.push(`/app/collections/${cid}/view/documents/${document.$id}`);
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Can't create document",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const temp_collection = findCollectionById(cid);
    let prepared_data: any = {};
    temp_collection?.columns?.map((column: IColumn) => {
      prepared_data[column.key] = "";
    });
    setCollection(temp_collection);
    setData(prepared_data);
  }, [pathname]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="top sticky w-full top-0 bg-background/80 backdrop-blur-sm z-[1] flex py-4 items-center justify-between mb-7">
        <Link
          href={`/app/collections/${cid}`}
          className="flex items-center gap-2 text-xs"
        >
          <div className="back-circle w-[30px] h-[30px] rounded-full bg-muted flex items-center justify-center">
            <ChevronLeft size={15} className="text-primary" />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl  font-semibold flex items-center gap-3">
            {collection?.pages?.create?.title || "Create new Document"}
          </h1>{" "}
          <p className="text-sm text-muted-foreground">
            {collection?.pages?.create?.description}
          </p>
        </div>
        <div></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-7/12">
        {collection?.columns?.map((column: IColumn, _) => {
          const {
            value,
            name,
            disabled,
            placeholder,
            required,
            defaultValue,
            onChange,
            ...rest
          } = column.rules || {};
          return (
            <div key={_} className="flex flex-col gap-1">
              <p className="text-xs capitalize text-muted-foreground">
                {column.label}
              </p>
              <div>
                {!column.type && (
                  <Input
                    {...rest}
                    required={required || true}
                    name={column.key}
                    onChange={handleChanges}
                    value={defaultValue || data[column.key]}
                    disabled={isCreating || disabled}
                    placeholder={placeholder || `Enter ${column.key}`}
                  />
                )}

                {column.type === "enum" && (
                  <Select
                    required={required || true}
                    onValueChange={(value) => {
                      setData((prev: any) => ({
                        ...prev,
                        [column.key]: value,
                      }));
                    }}
                    disabled={isCreating || disabled}
                    value={data[column.key] || (defaultValue as string)}
                    defaultValue={defaultValue as string}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {column.options.map((option: string, _) => (
                        <SelectItem key={_} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {column.type === "file" && (
                  <>
                    {data[column.key] ? (
                      <>
                        <ViewFile
                          className="w-[240px] h-[240px] object-cover rounded-md"
                          bucketId={column.bucketId}
                          fileId={data[column.key]}
                        />
                      </>
                    ) : (
                      <div className="w-[230px] h-[230px] bg-muted rounded-md flex items-center justify-center">
                        No photo selected
                      </div>
                    )}
                    <Input
                      disabled={isCreating || disabled}
                      className="mt-4 w-max bg-muted"
                      onChange={(e) => {
                        handleFileChange(e, column.bucketId, column.key);
                      }}
                      type={column.type}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
        <Button disabled={isCreating} type="submit">
          {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create {collection?.name.slice(0, -1)}
        </Button>
      </form>
    </div>
  );
};

export default CreateDocument;
