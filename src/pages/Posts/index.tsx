import React, { FC, useEffect, useRef } from "react";
import axios from "axios";
import { TPost } from "../../@types/posts";
import Post from "../../features/post";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createPost,
  getCurrentPage,
  getItems,
  getItemsCount,
  getItemsPerPage,
  setCurrentPage,
  setItems,
} from "./postsSlice";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(8, "Title should be of minimum 8 characters length")
    .required("Title is required"),
  body: yup
    .string()
    .min(8, "Body should be of minimum 8 characters length")
    .required("Body is required"),
});

const Posts: FC = () => {
  const userId = 1;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const items = useSelector(getItems);
  const isMounted = useRef(false);

  const postCount = useSelector(getItemsCount);
  const postOnPage = useSelector(getItemsPerPage);
  const page = useSelector(getCurrentPage) || 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(
        createPost({
          body: values.body,
          title: values.title,
          userId,
          id: postCount + 1,
        })
      );
      navigate(`/posts/101`);
    },
  });

  useEffect(() => {
    const fetchPosts = async (id: number) => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}/posts`
        );
        dispatch(setItems(data));
      } catch (e) {
        console.log(e);
      }
    };
    if (!isMounted.current) {
      fetchPosts(userId);
    }
    isMounted.current = true;
  }, [userId, dispatch]);
  return (
    <>
      <div>
        <Button onClick={handleOpen}>Create Post</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align={"center"}
            >
              Create Post
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                required
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                sx={{ marginBottom: 2 }}
                required
                id="body"
                name="body"
                label="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                error={formik.touched.body && Boolean(formik.errors.body)}
                helperText={formik.touched.body && formik.errors.body}
                fullWidth
                multiline
                maxRows={30}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      <div>
        {items
          .slice((page - 1) * postOnPage, page * postOnPage)
          ?.map((post: TPost) => (
            <Post
              id={post.id}
              body={post.body}
              title={post.title}
              key={post.id}
            />
          ))}
      </div>
      <Pagination
        count={Math.ceil(postCount / postOnPage)}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};
export default Posts;
