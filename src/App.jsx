import { useState } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import TodoStatus from './components/TodoStatus';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editTodoText, setEditTodoText] = useState({});
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onChangeEditTodoText = (e, id) =>
    setEditTodoText({
      ...editTodoText,
      [id]: e.target.value,
    });

  const onClickSave = () => {
    if (todoText.trim() === '') return;
    const newTodos = [
      ...todos,
      { id: uuidv4(), text: todoText.trim(), completed: false, edited: false },
    ];
    setTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setShow(false);
  };

  const onChangeComplete = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const onClickEdit = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.edited = !todo.edited;
    setTodos(newTodos);
    setEditTodoText((prev) => ({
      ...prev,
      [id]: todo.text,
    }));
  };

  const onClickSaveEdit = (id) => {
    if (editTodoText[id].trim() === '') return;
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.text = editTodoText[id].trim();
    todo.edited = false;
    setTodos(newTodos);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDeleteId(id);
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
        deleteId={deleteId}
      />
      <TodoStatus todos={todos} />
    </div>
  );
}

export default App;
