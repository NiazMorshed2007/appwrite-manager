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
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Models } from "appwrite";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditDocument = () => {
  const pathname = usePathname();
  const cid: string = pathname.split("/")[3];
  const did: string = pathname.split("/")[6];

  const { toast } = useToast();
  const router = useRouter();

  const [document, setDocument] = useState<Models.Document>(
    {} as Models.Document
  );
  const [collection, setCollection] = useState<ICollection>();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    bucketId: string,
    key: string
  ) => {
    try {
      const selectedFile = e.target.files ? e.target.files[0] : null;
      const file = await api.createFile(bucketId, selectedFile as File);
      setDocument((prev) => ({ ...prev, [key]: file.$id }));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDocument = async () => {
    const document = await api.getDocument(cid, did);
    const {
      $permissions,
      $collectionId,
      $createdAt,
      $databaseId,
      $updatedAt,
      ...rest
    } = document;
    setDocument(rest);
    setLoading(false);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      api.updateDocument(cid, did, document);
      toast({
        title: "Document updated successfully",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Failed to update document",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchDocument();
    setCollection(findCollectionById(cid));
  }, [pathname]);
  return (
    <div>
      {collection?.isEditable !== undefined && !collection?.isEditable ? (
        <div className="w-full flex-col h-[550px] flex items-center justify-center">
          <h1 className="text-4xl mb-3 font-semibold">Oopps,,,</h1>
          <h1 className="text-xl">
            You don't have permission to edit this document.
          </h1>
          <p className="text-sm text-muted-foreground">
            Please contact the owner of this collection to request edit
            permission.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link href={`/app/collections/${cid}`}>
              <Button>Go to all records</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="top sticky top-0 bg-background/80 backdrop-blur-sm z-[1] flex py-4 items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  router.back();
                }}
                className="back-circle cursor-pointer  w-[30px] h-[30px] rounded-full bg-muted flex items-center justify-center"
              >
                <ChevronLeft size={15} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl  font-semibold flex items-center gap-3">
                  {collection?.pages?.edit?.title || "Update Document"}
                </h1>{" "}
                <p className="text-sm text-muted-foreground">
                  {collection?.pages?.edit?.description}
                </p>
              </div>
            </div>

            <div className="actions flex items-center gap-4">
              <Button
                onClick={() => {
                  handleUpdate();
                }}
                disabled={isUpdating}
                className="text-xs"
              >
                <UpdateIcon
                  className={`mr-2 ${isUpdating ? "animate-spin" : ""}`}
                />{" "}
                Update
              </Button>
            </div>
          </div>

          {!loading ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="flex flex-col gap-6 w-7/12"
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">$id</p>
                <Input value={document.$id} readOnly disabled />
              </div>
              {collection?.columns?.map((column: IColumn, _) => {
                const {
                  value,
                  name,
                  disabled,
                  placeholder,
                  defaultValue,
                  onChange,
                  ...rest
                } = column.rules || {};
                return (
                  <div key={_} className="flex flex-col gap-1">
                    <p className="text-xs capitalize text-muted-foreground">
                      {column.label}
                    </p>
                    {document && (
                      <div>
                        {!column.type && (
                          <Input
                            {...rest}
                            name={column.key}
                            onChange={handleChanges}
                            value={document[column.key] || ""}
                            disabled={isUpdating || disabled}
                            placeholder={placeholder || `Enter ${column.key}`}
                          />
                        )}

                        {column.type === "enum" && (
                          <Select
                            onValueChange={(value) => {
                              setDocument((prev) => ({
                                ...prev,
                                [column.key]: value,
                              }));
                            }}
                            value={document[column.key]}
                            defaultValue={defaultValue as string}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={
                                  placeholder || `Select ${column.key}`
                                }
                              />
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
                            <ViewFile
                              className="w-[240px] h-[240px] object-cover rounded-md"
                              bucketId={column.bucketId}
                              fileId={document[column.key]}
                            />
                            <Input
                              className="mt-4 w-max bg-muted"
                              onChange={(e) => {
                                handleFileChange(
                                  e,
                                  column.bucketId,
                                  column.key
                                );
                              }}
                              type={column.type}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </form>
          ) : (
            <div className="flex items-center justify-center w-full h-[300px]">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditDocument;
