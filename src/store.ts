import { configureStore } from "@reduxjs/toolkit";
import { PostsSlice } from "./pages/Posts/postsSlice";
import { TodosSlice } from "./pages/Todos/todosSlice";
import { AlbumsSlice } from "./pages/Albums/albumsSlice";
import { PhotosSlice } from "./pages/Photos/photosSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    posts: PostsSlice.reducer,
    todos: TodosSlice.reducer,
    albums: AlbumsSlice.reducer,
    photos: PhotosSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
