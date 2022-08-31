import React, { FC, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { createTodo, getItems, setItems } from "./todosSlice";
import { TTodo } from "../../@types/todos";
import Todo from "../../features/todo";
import Pagination from "@mui/material/Pagination";
import {
  getCurrentPage,
  getItemsCount,
  getItemsPerPage,
  setCurrentPage,
} from "./todosSlice";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(8, "Title should be of minimum 8 characters length")
    .required("Title is required"),
});

const Todos: FC = () => {
  const userId = Number(localStorage.getItem('userId'));
  const todos = useSelector(getItems);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const postCount = useSelector(getItemsCount);
  const postOnPage = useSelector(getItemsPerPage);
  const page = useSelector(getCurrentPage) || 1;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(
        createTodo({
          id: postCount + 1,
          title: values.title,
          userId,
          completed: false,
        })
      );
      navigate(`/todos`);
    },
  });

  useEffect(() => {
    const fetchTodos = async (id: number) => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}/todos`
        );
        dispatch(setItems(data));
      } catch (e) {
        console.log(e);
      }
    };
    if (!isMounted.current) fetchTodos(userId);
    isMounted.current = true;
  }, [dispatch]);
  return (
    <>
      <Button onClick={handleOpen}>Create Todos</Button>
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
            Create Todo
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

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <div>
        {todos
          .slice((page - 1) * postOnPage, page * postOnPage)
          .map((todo: TTodo) => (
            <Todo
              title={todo.title}
              completed={todo.completed}
              key={todo.id}
              id={todo.id}
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

export default Todos;
