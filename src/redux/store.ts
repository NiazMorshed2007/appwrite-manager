import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import collectionSlice from "./collectionSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    collection: collectionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
