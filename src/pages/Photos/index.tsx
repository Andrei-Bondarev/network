import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setItems } from "./photosSlice";
import Grid from "@mui/material/Grid";
import Photo from "../../features/photo";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {
  getCurrentPage,
  getItemsCount,
  getItemsPerPage,
  setCurrentPage,
} from "./photosSlice";

const Photos = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const isMounted = useRef(false);
  const postCount = useSelector(getItemsCount);
  const postOnPage = useSelector(getItemsPerPage);
  const page = useSelector(getCurrentPage) || 1;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };
  useEffect(() => {
    const fetchPhotos = async (id: number) => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${id}/photos`
        );
        dispatch(setItems(data));
      } catch (e) {
        console.log(e);
      }
    };
    if (!isMounted.current && albumId) fetchPhotos(Number(albumId));
    isMounted.current = true;
  }, [dispatch, albumId]);
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
          .map((photo) => (
            <Grid item xs={2} sm={4} md={4} key={photo.id}>
              <Photo
                title={photo.title}
                url={photo.url}
                thumbnailUrl={photo.thumbnailUrl}
              />
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
export default Photos;
