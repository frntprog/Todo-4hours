import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./Todos.module.css";
import { addNewTodo } from "./todosSlice";

const Form = () => {
  const todoRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todoRef.current.value);
    dispatch(
      addNewTodo({ todo: todoRef.current.value, completed: false, userId: 1 })
    );
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input type="text" ref={todoRef} />
    </form>
  );
};

export default Form;
