export interface IBaseCollection {
  name: string;
  collectionId?: string;
  columns?: any[];
}

export interface IGroupCollection extends IBaseCollection {
  type: "group";
  collections: ICollection[];
}

export interface INormalCollection extends IBaseCollection {
  type?: string;
}

export type ICollection = IGroupCollection | INormalCollection;
