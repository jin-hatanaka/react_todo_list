import styles from './TodoList.module.css';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';

export default function TodoList({
  todos,
  editTodoText,
  onChangeEditTodoText,
  onClickSaveEdit,
  onChangeComplete,
  onClickEdit,
  show,
  handleShow,
  handleClose,
  onClickDelete,
  deleteId,
}) {
  return (
    <div>
      <ListGroup className={styles.listGroup}>
        {todos.map((todo) => (
          <ListGroup.Item className={styles.listRow} key={todo.id}>
            {todo.edited ? (
              <>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={editTodoText[todo.id]}
                  onChange={(e) => onChangeEditTodoText(e, todo.id)}
                />
                <Button
                  className={styles.button}
                  variant="primary"
                  onClick={() => onClickSaveEdit(todo.id)}
                >
                  保存
                </Button>
              </>
            ) : (
              <>
                <Form.Check
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onChangeComplete(todo.id)}
                />
                <p className={styles.todoItem}>{todo.text}</p>
                <Button
                  className={styles.button}
                  variant="success"
                  onClick={() => onClickEdit(todo.id)}
                >
                  編集
                </Button>
                <Button
                  className={styles.button}
                  variant="danger"
                  onClick={() => handleShow(todo.id)}
                >
                  削除
                </Button>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>確認画面</Modal.Title>
        </Modal.Header>
        <Modal.Body>本当に削除してもよろしいですか？</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onClickDelete(deleteId)}>
            OK
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
