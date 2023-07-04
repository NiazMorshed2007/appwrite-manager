import { IColumn } from "./IColumn";

export interface ICollection {
  name: string;
  collectionId: string;
  groupId?: string;
  searchColumn?: string;
  isEditable?: boolean;
  isDeleteable?: boolean;
  columns?: IColumn[];
}
