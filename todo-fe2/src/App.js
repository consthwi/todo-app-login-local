import { Button, Container, Grid2, TextField } from "@mui/material";
import "./App.css";
import styled from "@emotion/styled";
import TodoBoard from "./components/TodoBoard";
import api from "./utils/api";
import { useEffect, useState } from "react";

// style component
const TodoContainer = styled(Container)(() => ({
  padding: "1rem",
}));

const TodoTitle = styled("h1")(() => ({
  fontSize: "2rem",
  color: "salmon",
  textAlign: "center",
}));

const TodoText = styled(Grid2)(() => ({}));

const TodoInput = styled(TextField)(() => ({
  color: "#8c7967",
  transition: "0.3s all",
  backgroundColor: "#ffffff11",
  // border: "1px solid #e07368",
  borderRadius: "5px",
  // "&:hover": { background: "#ffffff88" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cccccc",
      zIndex: "-1",
    },
    "&:hover fieldset": {
      borderColor: "#e07368",
      background: "#ffffff88",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e07368",
      background: "#ffffff88",
    },
  },
}));

const AddButton = styled(Button)(() => ({
  width: "100%",
  height: "100%",
  fontSize: "1rem",
  padding: "0.1rem",
  border: "none",
  boxShadow: "#e07368 1px 1px 3px",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "#e07368", color: "#fff" },
  "@media(max-width:900px)": { fontSize: "0.8rem" },
}));

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const res = await api.get("/tasks");
    // console.log("rrr", res);
    setTodoList(res.data.data);
  };

  const addTask = async () => {
    const res = await api.post("/tasks", {
      task: todoValue,
      isComplete: false,
    });
    if (res.status === 200) {
      console.log("todo추가 성공");
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
          <AddButton variant="contained" onClick={addTask}>
            Enter
          </AddButton>
        </Grid2>
      </TodoText>
      <TodoBoard
        todoList={todoList}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    </TodoContainer>
  );
}

export default App;
