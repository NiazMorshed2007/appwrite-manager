import api from "@/appwrite/appwrite";
import React from "react";

interface ViewFileProps extends React.HTMLAttributes<HTMLImageElement> {
  bucketId: string;
  fileId: string;
}

const ViewFile: React.FC<ViewFileProps> = (props) => {
  const { bucketId, fileId, className, ...rest } = props;
  return (
    <img
      className={className}
      src={api.getFilePreview(bucketId, fileId)}
      alt="file"
      {...rest}
    />
  );
};

export default ViewFile;
