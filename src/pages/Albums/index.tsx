import React, { FC, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setItems } from "./albumsSlice";
import Album from "../../features/album";
import Grid from "@mui/material/Grid";
import {
  getCurrentPage,
  getItemsCount,
  getItemsPerPage,
  setCurrentPage,
} from "./albumsSlice";
import Pagination from "@mui/material/Pagination";

const Albums: FC = () => {
  const userId = Number(localStorage.getItem('userId'));
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const items = useSelector(getItems);
  const postCount = useSelector(getItemsCount);
  const postOnPage = useSelector(getItemsPerPage);
  const page = useSelector(getCurrentPage) || 1;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };
  useEffect(() => {
    const fetchAlbums = async (id: number) => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}/albums`
        );
        dispatch(setItems(data));
      } catch (e) {
        console.log(e);
      }
    };
    if (!isMounted.current) fetchAlbums(userId);
    isMounted.current = true;
  }, [dispatch]);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          maxWidth: 1400,
        }}
      >
        {items
          .slice((page - 1) * postOnPage, page * postOnPage)
          .map((album) => (
            <Grid item xs={2} sm={4} md={4} key={album.id}>
              <Album title={album.title} albumId={album.id} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={Math.ceil(postCount / postOnPage)}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

export default Albums;
