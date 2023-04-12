import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const TODOS_URL = "https://dummyjson.com/todos";

const initialState = {
  todos: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${TODOS_URL}?limit=3`);
  return response.data;
});

export const addNewTodo = createAsyncThunk(
  "posts/addNewTodo",
  async (initialToto) => {
    const response = await axios.post(`${TODOS_URL}/add`, initialToto);
    return response.data;
  }
);

export const updateTodoStatus = createAsyncThunk(
  "todos/updateTodoStatus",
  async (todo) => {
    const { id } = todo;

    try {
      const response = await axios.patch(`${TODOS_URL}/${id}`, {
        completed: todo.completed,
      });
      if (response?.status === 200) return todo;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todo) => {
  const { id } = todo;
  try {
    console.log(`${TODOS_URL}/${id}`);
    const response = await axios.delete(`${TODOS_URL}/${id}`);
    if (response?.status === 200) return todo;
    return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
    return err.message;
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = [...action.payload.todos];
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push({ ...action.payload, id: state.todos.length + 1 });
      })
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;

        const todos = state.todos.filter((todo) => todo.id !== id);
        const sortedPosts = [...todos, action.payload].sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        state.todos = sortedPosts;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const todos = state.todos.filter((todo) => todo.id !== id);
        state.todos = todos;
      });
  },
});

export const selectAllTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.status;
export const getTodosError = (state) => state.todos.error;

export default todosSlice.reducer;
