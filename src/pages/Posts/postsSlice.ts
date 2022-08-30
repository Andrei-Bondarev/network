import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost } from "../../@types/posts";
import { RootState } from "../../store";
import axios from "axios";

interface IPostsInitialState {
  items: TPost[];
  status: string;
  itemsPerPage: number;
  currentPage: number;
}

type TCreatePostParams = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const createPost = createAsyncThunk<TPost, TCreatePostParams>(
  "posts/createPost",
  async ({ id, userId, title, body }) => {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      { id, userId, title, body }
    );
    return data;
  }
);

export const updatePost = createAsyncThunk<TPost, TCreatePostParams>(
  "posts/updatePost",
  async ({ id, userId, title, body }) => {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      { id, userId, title, body }
    );
    return data;
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
  }
);

const initialState: IPostsInitialState = {
  items: [],
  status: "",
  itemsPerPage: 3,
  currentPage: 1,
};

export const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPost[]>) {
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
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.body = action.payload.body;
          item.title = action.payload.title;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export const getItems = (state: RootState) => state.posts.items;
export const getItemsCount = (state: RootState) => state.posts.items.length;
export const getCurrentPage = (state: RootState) => state.posts.currentPage;
export const getItemsPerPage = (state: RootState) => state.posts.itemsPerPage;
export const getItemById = (id: number) => (state: RootState) =>
  state.posts.items.find((item) => item.id === id);

export const { setItems, clearItems, setCurrentPage } = PostsSlice.actions;

export default PostsSlice.reducer;
