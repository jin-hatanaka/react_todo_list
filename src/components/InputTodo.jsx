import styles from './InputTodo.module.css';
import { Button, Form } from 'react-bootstrap';

export default function InputTodo({ todoText, onChange, onClick }) {
  return (
    <div className={styles.inputArea}>
      <Form.Control
        className={styles.input}
        type="text"
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <Button className={styles.button} variant="primary" onClick={onClick}>
        保存
      </Button>
    </div>
  );
}
