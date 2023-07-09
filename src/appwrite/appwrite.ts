import { config } from "@/config/config";
import {
  Account,
  Client as Appwrite,
  Databases,
  ID,
  Models,
  Query,
  Storage,
} from "appwrite";

const databaseId = config.databaseId;

let api: any = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(config.endpoint).setProject(config.projectId);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);
    const storage = new Storage(appwrite);

    api.sdk = { database, account, storage };
    return api.sdk;
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (loginBody: any) => {
    return api
      .provider()
      .account.createEmailSession(loginBody.email, loginBody.password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId: string, data: JSON, permissions: any) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        permissions
      );
  },
  getDocuments: (
    collectionId: string,
    limit: number,
    offset: number,
    queries: string[]
  ) => {
    return api
      .provider()
      .database.listDocuments(databaseId, collectionId, [
        Query.limit(limit || 10),
        Query.offset(offset || 0),
        ...(queries || []),
      ]);
  },

  getDocument: (collectionId: string, documentId: string, queries: any) => {
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, documentId, queries);
  },

  updateDocument: (collectionId: string, documentId: string, data: JSON) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (collectionId: string, documentId: string) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },

  createFile: (bucketId: string, file: any) => {
    return api.provider().storage.createFile(bucketId, ID.unique(), file);
  },

  getFilePreview: (bucketId: string, fileId: string) => {
    return api.provider().storage.getFileView(bucketId, fileId);
  },
};

export default api;
