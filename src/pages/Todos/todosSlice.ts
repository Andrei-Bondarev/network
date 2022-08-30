import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TTodo } from "../../@types/todos";
import axios from "axios";

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
type TTodoSetTitle = {
  id: number;
  title: string;
};

export const createTodo = createAsyncThunk<TTodo, TTodo>(
  "todos/createTodo",
  async ({ id, userId, title, completed }) => {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { id, userId, title, completed }
    );
    return data;
  }
);

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
    toggleTodoStatus(state, action: PayloadAction<number>) {
      const todo = state.items.find((todo) => action.payload === todo.id);
      if (todo) todo.completed = !todo.completed;
    },
    setTitle(state, action: PayloadAction<TTodoSetTitle>) {
      const todo = state.items.find((todo) => action.payload.id === todo.id);
      if (todo) todo.title = action.payload.title;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const getItems = (state: RootState) => state.todos.items;
export const getItemsCount = (state: RootState) => state.todos.items.length;
export const getCurrentPage = (state: RootState) => state.todos.currentPage;
export const getItemsPerPage = (state: RootState) => state.todos.itemsPerPage;

export const {
  setItems,
  clearItems,
  setCurrentPage,
  toggleTodoStatus,
  setTitle,
} = TodosSlice.actions;

export default TodosSlice.reducer;
