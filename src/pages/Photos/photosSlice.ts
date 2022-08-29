import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TPhoto } from "../../@types/photos";

interface IAlbumsInitialState {
  items: TPhoto[];
  status: string;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: IAlbumsInitialState = {
  items: [],
  status: "",
  itemsPerPage: 9,
  currentPage: 1,
};

export const PhotosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPhoto[]>) {
      state.items = action.payload;
      state.status = "loaded";
    },
    clearItems(state) {
      state.items = [];
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const getItems = (state: RootState) => state.photos.items;
export const getItemsCount = (state: RootState) => state.photos.items.length;
export const getCurrentPage = (state: RootState) => state.photos.currentPage;
export const getItemsPerPage = (state: RootState) => state.photos.itemsPerPage;

export const { setItems, clearItems, setCurrentPage } = PhotosSlice.actions;

export default PhotosSlice.reducer;
