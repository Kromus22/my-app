import { FormCheck } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { getDatabase, ref, update, remove, onValue } from "firebase/database";
import firebaseApp from "../firebase";
import { Todo } from "../types";
import './todoList.css';
import { useEffect, useState } from "react";
import { checkDate, getClass } from "../utils";

const TodoList = () => {
  const db = getDatabase(firebaseApp);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const todoRef = ref(db, "/todos");

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: Todo[] = [];

      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      };

      setTodoList(newTodoList);
    });
  }, [db]);


  const changeTodoCompletion = (todo: Todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { done: !todo.done });
  };

  const handleDeleteTodo = (id: string) => {
    const todoRef = ref(db, "/todos/" + id);
    remove(todoRef);
  };

  const changeTodoTitle = (e: any, todo: Todo) => {
    e.preventDefault()
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { title: e.target.value });
  };

  const changeTodoDescr = (e: any, todo: Todo) => {
    e.preventDefault()
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { descr: e.target.value });
  };

  const changeTodoDate = (e: any, todo: Todo) => {
    e.preventDefault()
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { date: e.target.value });
  };

  const checkExpired = (todo: Todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    if (checkDate(todo.date)) {
      return update(todoRef, { expired: true });
    } else {
      return update(todoRef, { expired: false });
    }
  }

  return (
    <>
      <h1 className="tasks-title">Список дел</h1>
      {todoList.map((todo) => {
        checkExpired(todo);

        const file = String(todo.file)
        return (
          <div className={getClass(todo)}>
            <FormCheck
              key={todo.id}
              checked={todo.done}
              onChange={() => changeTodoCompletion(todo)}
              label={todo.title}
            />
            <div>
              <input
                type='text'
                value={todo.title}
                onChange={(e) => changeTodoTitle(e, todo)}
              />
              <textarea
                value={todo.descr}
                onChange={(e) => changeTodoDescr(e, todo)}
              />
              <p>Необходимо выполнить до: <input
                type='text'
                value={todo.date}
                onChange={(e) => changeTodoDate(e, todo)}
              />
              </p>
              {
                todo.file &&
                <a href={file} download>Прикреплённый файл</a>
              }

            </div>
            <div className="buttons">
              <Button variant="danger" onClick={() => { handleDeleteTodo(todo.id) }}>Удалить</Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;