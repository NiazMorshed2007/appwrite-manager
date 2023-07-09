import { ICollection } from "@/interfaces/ICollection";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: ICollection = {} as ICollection;

export const collectionSlice = createSlice({
  name: "coll",
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<ICollection>) => {
      return action.payload;
    },
  },
});

export const selectCollection = (state: RootState) => state.collection;

export const { setCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
