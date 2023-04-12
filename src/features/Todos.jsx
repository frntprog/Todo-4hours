import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  selectAllTodos,
  getTodosStatus,
  getTodosError,
} from "./todosSlice";
import classes from "./Todos.module.css";
import Todo from "./Todo";

const Todos = () => {
  const todos = useSelector(selectAllTodos);
  const status = useSelector(getTodosStatus);
  const error = useSelector(getTodosError);
  const dispatch = useDispatch();

  console.log(todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  let content;
  if (status === "loading") {
    content = "Loading...";
  } else if (status === "succeeded") {
    content = todos.map((todo) => {
      return <Todo key={todo.id} todo={todo} />;
    });
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return <section className={classes.todos}>{content}</section>;
};

export default Todos;
