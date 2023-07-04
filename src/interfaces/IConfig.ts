import { ICollection } from "./ICollection";
import { IGroup } from "./IGroup";

export interface IConfig {
  endpoint: string;
  projectId: string;
  projectName: string;
  projectLogo: string;
  databaseId: string;
  groups: IGroup[];
  collections: ICollection[]; // TODO: add type
}
