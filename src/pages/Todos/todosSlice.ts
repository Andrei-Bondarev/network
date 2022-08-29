import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TTodo } from "../../@types/todos";

interface ITodosInitialState {
  items: TTodo[];
  status: string;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: ITodosInitialState = {
  items: [],
  status: "",
  itemsPerPage: 5,
  currentPage: 1,
};

export const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TTodo[]>) {
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

export const getItems = (state: RootState) => state.todos.items;
export const getItemsCount = (state: RootState) => state.todos.items.length;
export const getCurrentPage = (state: RootState) => state.todos.currentPage;
export const getItemsPerPage = (state: RootState) => state.todos.itemsPerPage;

export const { setItems, clearItems, setCurrentPage } = TodosSlice.actions;

export default TodosSlice.reducer;
