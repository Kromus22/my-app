import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getDatabase, ref, push } from "firebase/database";
import firebaseApp from "../firebase";
import './todoList.css';

const TodoForm = () => {
  const db = getDatabase(firebaseApp);

  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescr(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.value);
  };

  const addTodo = () => {
    const todoRef = ref(db, "/todos");
    const todo = {
      title,
      descr,
      date,
      done: false,
      file,
      expired: false,
    };
    push(todoRef, todo);
  };

  return (
    <>
      <Form>
        <Form.Control onChange={handleChangeTitle} placeholder={'Введите название'} />
        <Form.Control onChange={handleChangeDescr} placeholder={'Введите описание'} />
        <Form.Control onChange={handleChangeDate} placeholder={'До какого числа выполнить задачу'} />
        <Form.Group controlId="formFile" className="mb-3" onChange={handleChangeFile}>
          <Form.Label>Выберите файл если необходимо</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button type="submit" onClick={addTodo}>
          Добавить Task
        </Button>
      </Form>

    </>
  )
};

export default TodoForm;