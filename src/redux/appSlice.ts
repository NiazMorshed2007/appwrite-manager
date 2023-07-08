import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface StateInterface {
  limit: number;
  offset: number;
  total: number;
  currentPage: number;
}

const initialState: StateInterface = {
  limit: 10,
  offset: 0,
  total: 0,
  currentPage: 1,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectLimit = (state: RootState) => state.app.limit;
export const selectTotal = (state: RootState) => state.app.total;
export const selectCurrentPage = (state: RootState) => state.app.currentPage;
export const selectPageCount = (state: RootState) =>
  Math.ceil(state.app.total / state.app.limit);

export const { setLimit, setTotal, setCurrentPage } = appSlice.actions;

export default appSlice.reducer;
