import Form from "./features/Form";
import Todos from "./features/Todos";
import classes from "./features/Todos.module.css";

function App() {
  return (
    <div>
      <h1 className={classes.heading}>Todo List</h1>
      <Form />
      <Todos />
    </div>
  );
}

export default App;
