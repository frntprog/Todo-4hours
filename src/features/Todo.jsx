import React from "react";
import { useDispatch } from "react-redux";
import classes from "./Todos.module.css";
import { deleteTodo, updateTodoStatus } from "./todosSlice";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const changeStatusHandle = () => {
    const changedTodo = { ...todo };
    changedTodo.completed = !changedTodo.completed;
    dispatch(updateTodoStatus(changedTodo));
  };

  return (
    <div className={classes.todo}>
      <div
        className={todo.completed ? classes.done : ""}
        onClick={changeStatusHandle}
      >
        {todo.todo}
      </div>
      <button
        onClick={() => {
          dispatch(deleteTodo(todo));
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
