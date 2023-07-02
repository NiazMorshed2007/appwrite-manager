export interface IConfig {
  endpoint: string;
  projectId: string;
  project_name: string;
  databaseId: string;
  collections: any[]; // TODO: add type
}
