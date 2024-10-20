import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import styled from "@emotion/styled";
import api from "../utils/api";
import TodoContainer from "../components/common/TodoContainer";
import TodoBoard from "../components/TodoBoard";
import TodoButton from "../components/common/TodoButton";
import TodoInput from "../components/common/TodoInput";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const TodoTitle = styled("h1")(() => ({
    fontSize: "2rem",
    color: "salmon",
    textAlign: "center",
  }));

  const TodoText = styled(Grid2)(() => ({}));

  const getTasks = async () => {
    const res = await api.get("/tasks");
    setTodoList(res.data.data);
  };

  const addTask = async () => {
    const res = await api.post("/tasks", {
      task: todoValue,
      isComplete: false,
    });
    if (res.status === 200) {
      setTodoValue("");
      getTasks();
    }
  };

  const toggleComplete = async (id) => {
    try {
      const targetTask = todoList.find((item) => {
        return item._id === id;
      });
      const res = await api.put(`/tasks/${id}`, {
        isComplete: !targetTask.isComplete,
      });
      if (res.status === 200) {
        console.log("todo갱신 성공");
        getTasks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    if (res.status === 200) {
      console.log("todo제거 성공");
      getTasks();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TodoContainer>
      <TodoTitle>Todo-App</TodoTitle>
      <TodoText container spacing={{ xs: 1, md: 2 }}>
        <Grid2 size={{ xs: 12, md: 10 }}>
          <TodoInput
            onChange={(e) => setTodoValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            value={todoValue}
            placeholder="오늘은 무엇을 할까요?"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <TodoButton variant="contained" onClick={addTask}>
            Enter
          </TodoButton>
        </Grid2>
      </TodoText>
      <TodoBoard
        todoList={todoList}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    </TodoContainer>
  );
};

export default TodoPage;
