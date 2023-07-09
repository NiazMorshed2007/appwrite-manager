import { IColumn } from "./IColumn";

export interface ICollection {
  name: string;
  collectionId: string;
  groupId?: string;
  searchColumn?: string;
  isEditable?: boolean;
  isDeleteable?: boolean;
  columns?: IColumn[];
  settings?: {
    limitOptions?: number[];
  };
  pages?: {
    view?: {
      title: string;
      description: string;
    };
    edit?: {
      title: string;
      description: string;
    };
    create?: {
      title: string;
      description: string;
    };
  };
}
