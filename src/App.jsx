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
    const text = todoText.trim();
    if (text === '') return;
    const newTodos = [
      ...todos,
      { id: uuidv4(), text: text, completed: false, edited: false },
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
    // prevTodos：現在のToDoリストの配列
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        // : 以降の todo は元の todo(オブジェクト) をそのまま返す
        todo.id === id ? { ...todo, edited: !todo.edited } : todo
      )
    );

    setEditTodoText((prev) => ({
      ...prev,
      [id]: todos.find((todo) => todo.id === id)?.text || '',
    }));
  };
  // メモ
  // ?.text の部分（オプショナルチェーン）
  // ・find(...) の結果が undefined でなければ .text を取り出す。
  // ・もし見つからなければエラーを出さずに undefined を返す。

  // || '' の部分
  // ・?.text が undefined や null の場合、代わりに空文字列 '' を使うという意味。
  // ・つまり、ToDoが見つからなかった場合でも安全に空文字列が入るようにしている。

  const onClickSaveEdit = (id) => {
    const text = editTodoText[id].trim();
    if (text === '') return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: text, edited: false } : todo
      )
    );
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
