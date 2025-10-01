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
  deleteIndex,
}) {
  return (
    <div>
      <ListGroup className={styles.listGroup}>
        {todos.map((todo, index) => (
          <ListGroup.Item className={styles.listRow} key={todo.text}>
            {todo.edited ? (
              <>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={editTodoText[index]}
                  onChange={(e) => onChangeEditTodoText(e, index)}
                />
                <Button
                  className={styles.button}
                  variant="primary"
                  onClick={() => onClickSaveEdit(index)}
                >
                  保存
                </Button>
              </>
            ) : (
              <>
                <Form.Check
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onChangeComplete(index)}
                />
                <p className={styles.todoItem}>{todo.text}</p>
                <Button
                  className={styles.button}
                  variant="success"
                  onClick={() => onClickEdit(index)}
                >
                  編集
                </Button>
                <Button
                  className={styles.button}
                  variant="danger"
                  onClick={() => handleShow(index)}
                >
                  削除
                </Button>
              </>
            )}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>確認画面</Modal.Title>
              </Modal.Header>
              <Modal.Body>本当に削除してもよろしいですか？</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => onClickDelete(deleteIndex)}
                >
                  OK
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  キャンセル
                </Button>
              </Modal.Footer>
            </Modal>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
