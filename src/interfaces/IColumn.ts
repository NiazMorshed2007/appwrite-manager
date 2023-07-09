import React from "react";

export type IColumn = {
  key: string;
  label: string;
  enableHiding?: boolean;
  className?: string;
  rules?: IRules;
} & (IBoolean | IFile | IString | IDate | IEnum);

interface IRules extends React.InputHTMLAttributes<HTMLInputElement> {}

type IBoolean = {
  type?: "boolean";
};

type IFile = {
  type?: "file";
  bucketId: string;
};

type IString = {
  type?: "string";
};

type IDate = {
  type?: "date";
};

type IEnum = {
  type?: "enum";
  options: string[];
  rules?: React.SelectHTMLAttributes<HTMLSelectElement>;
};
