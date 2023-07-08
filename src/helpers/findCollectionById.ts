import { config } from "@/config/config";
import { ICollection } from "@/interfaces/ICollection";

export const findCollectionById = (cid: string): ICollection | undefined => {
  for (const collection of config.collections) {
    if (collection?.collectionId === cid) {
      return collection;
    }
  }
};
