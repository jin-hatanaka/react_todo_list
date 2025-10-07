export default function TodoStatus({ todos }) {
  return (
    <div>
      <span>
        {`全てのタスク:${todos.length} 
          完了済み:${todos.filter((todo) => todo.completed).length} 
          未完了:${todos.filter((todo) => !todo.completed).length}`}
      </span>
    </div>
  );
}
