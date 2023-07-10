import React from "react";
import { Button } from "../ui/button";

interface DeleteDocumentProps extends React.HTMLAttributes<HTMLButtonElement> {}

const DeleteDocument: React.FC<DeleteDocumentProps> = (props) => {
  const;
  return (
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
  );
};

export default DeleteDocument;
