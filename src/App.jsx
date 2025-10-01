import { useState } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import TodoStatus from './components/TodoStatus';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editTodoText, setEditTodoText] = useState({});
  const [show, setShow] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onChangeEditTodoText = (e, index) =>
    setEditTodoText({
      ...editTodoText,
      [index]: e.target.value,
    });

  const onClickSave = () => {
    if (todoText === '') return;
    const newTodos = [
      ...todos,
      { text: todoText, completed: false, edited: false },
    ];
    setTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setShow(false);
  };

  const onChangeComplete = (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const onClickEdit = (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    todo.edited = !todo.edited;
    setTodos(newTodos);
    setEditTodoText((prev) => ({
      ...prev,
      [index]: todo.text,
    }));
  };

  const onClickSaveEdit = (index) => {
    if (editTodoText[index] === '') return;
    const newTodos = [...todos];
    newTodos[index].text = editTodoText[index];
    newTodos[index].edited = false;
    setTodos(newTodos);
  };

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setShow(true);
    setDeleteIndex(index);
  };

  return (
    <div className="container">
      <h1>TODO</h1>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickSave}
      />
      <TodoList
        todos={todos}
        editTodoText={editTodoText}
        onChangeEditTodoText={onChangeEditTodoText}
        onClickSaveEdit={onClickSaveEdit}
        onChangeComplete={onChangeComplete}
        onClickEdit={onClickEdit}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        onClickDelete={onClickDelete}
        deleteIndex={deleteIndex}
      />
      <TodoStatus todos={todos} />
    </div>
  );
}

export default App;
