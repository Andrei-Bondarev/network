import React from "react";
import "./App.css";
import Header from "./features/header";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Grid from "@mui/material/Grid";
import Photos from "./pages/Photos";
import PostDetails from "./features/postDetails";
import { Routes, Route } from "react-router-dom";
function App() {
  localStorage.setItem('userId', '1');
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop={"100px"}
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Header />
        <Routes>
          <Route path={"/posts"} element={<Posts />} />
          <Route path={"/albums"} element={<Albums />} />
          <Route path={"/album/:albumId/photos"} element={<Photos />} />
          <Route path={"/todos"} element={<Todos />} />
          <Route path={"/posts/:postId"} element={<PostDetails />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
