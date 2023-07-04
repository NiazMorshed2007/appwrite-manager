export interface IConfig {
  endpoint: string;
  projectId: string;
  projectName: string;
  projectLogo: string;
  databaseId: string;
  groups: any[];
  collections: any[]; // TODO: add type
}
