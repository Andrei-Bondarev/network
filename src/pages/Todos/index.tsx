import React, { FC, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setItems } from "./todosSlice";
import { TTodo } from "../../@types/todos";
import Todo from "../../features/todo";
import Pagination from "@mui/material/Pagination";
import {
  getCurrentPage,
  getItemsCount,
  getItemsPerPage,
  setCurrentPage,
} from "./todosSlice";

const Todos: FC = () => {
  const userId = 1;
  const todos = useSelector(getItems);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const postCount = useSelector(getItemsCount);
  const postOnPage = useSelector(getItemsPerPage);
  const page = useSelector(getCurrentPage) || 1;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };
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
      <div>
        {todos
          .slice((page - 1) * postOnPage, page * postOnPage)
          .map((todo: TTodo) => (
            <Todo title={todo.title} body={todo.body} key={todo.id} />
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
