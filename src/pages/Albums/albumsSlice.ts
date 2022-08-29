import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TAlbum } from "../../@types/albums";

interface IAlbumsInitialState {
  items: TAlbum[];
  status: string;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: IAlbumsInitialState = {
  items: [],
  status: "",
  itemsPerPage: 3,
  currentPage: 1,
};

export const AlbumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TAlbum[]>) {
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

export const getItems = (state: RootState) => state.albums.items;
export const getItemsCount = (state: RootState) => state.albums.items.length;
export const getCurrentPage = (state: RootState) => state.albums.currentPage;
export const getItemsPerPage = (state: RootState) => state.albums.itemsPerPage;

export const { setItems, clearItems, setCurrentPage } = AlbumsSlice.actions;

export default AlbumsSlice.reducer;
