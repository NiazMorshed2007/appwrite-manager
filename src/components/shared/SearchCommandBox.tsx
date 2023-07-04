"use client";

import { config } from "@/config/config";
import {
  EnvelopeClosedIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { Dispatch } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import { FileText, Home } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const SearchCommandBox: React.FC<Props> = (props) => {
  const { open, setOpen } = props;
  const router = useRouter();
  return (
    <CommandDialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <CommandInput placeholder="Search anything..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Basic">
          <CommandItem
            onSelect={() => {
              setOpen(false);
              router.push(`/app`);
            }}
          >
            <Home size={14} className="mr-2" />
            <span>Overview</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              router.push(`/app/profile`);
            }}
          >
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              router.push(`/app/settings`);
            }}
          >
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Collections">
          {config.collections.map((collection, _) => (
            <CommandItem
              onSelect={() => {
                setOpen(false);
                router.push(`/app/collections/${collection.collectionId}`);
              }}
              key={_}
            >
              <FileText size={14} className="mr-2" />
              <span>{collection.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommandBox;
