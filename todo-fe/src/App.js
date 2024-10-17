import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  // 처음 시작 R
  const getTasks = async () => {
    const res = await api.get("/tasks");
    console.log("rrrr", res);
    setTodoList(res.data.data);
  };

  // 추가버튼 클릭 C
  const addTask = async () => {
    try {
      const res = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (res.status === 200) {
        console.log("성공");
        // 1. 입력한 값이 사라지지 않음
        setTodoValue("");
        // 2. UI출력 x
        getTasks();
      } else {
        throw new Error("할일을 추가할 수 없습니다");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  // 끝남버튼 클릭 U (isComplete toggle)
  const toggleComplete = async (id) => {
    try {
      // item부터 생성해야하므로 targetTask를 먼저 처리
      const targetTask = todoList.find((item) => {
        return item._id === id;
      });
      // console.log(targetTask)

      // put(target, update)
      const res = await api.put(`/tasks/${id}`, {
        isComplete: !targetTask.isComplete,
      });

      if (res.status === 200) {
        console.log("성공", targetTask);
        getTasks();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  // 삭제버튼 클릭 D
  const deleteItem = async (id) => {
    // console.log(id);
    const res = await api.delete(`/tasks/${id}`);
    if (res.status === 200) {
      console.log("delete ok");
      getTasks();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    </Container>
  );
}

export default App;
