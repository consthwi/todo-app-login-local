import styled from "@emotion/styled";
import { Button, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import React from "react";

const TodoItemContainer = styled(Grid2)(() => ({
  padding: "10px 0",
  borderBottom: "3px dashed #e0736888",
  display: "flex",
  alignItems: "center",
}));

const ButtonWrapper = styled("div")(() => ({
  display: "flex",
  gap: "5px",
}));

const ButtonDelete = styled(Button)(() => ({
  border: "none",
  boxShadow: "#e07368 1px 1px 3px",
  color: "salmon",
  fontSize: "0.6rem",
  padding: "0.4rem",
  "&:hover": { backgroundColor: "#e07368", color: "#fff" },
  "@media(min-width: 900px)": {
    fontSize: "0.8rem",
    padding: "0.4rem 0.8rem",
  },
}));

const ButtonDone = styled(Button)(() => ({
  border: "none",
  boxShadow: "#87c5f9 1px 1px 3px",
  color: "#87c5f9",
  fontSize: "0.6rem",
  padding: "0.4rem",
  "&:hover": { backgroundColor: "#87c5f9", color: "#fff" },
  "@media(min-width: 900px)": {
    fontSize: "0.8rem",
    padding: "0.4rem 0.8rem",
  },
}));

const ButtonUndone = styled(Button)(() => ({
  border: "none",
  boxShadow: "#7cc1b0 1px 1px 3px",
  backgroundColor: "#7cc1b0",
  color: "#fff",
  fontSize: "0.6rem",
  padding: "0.4rem",
  transition: "0.2s transform",
  "&:hover": { transform: "translateY(-3px)" },
  "@media(min-width: 900px)": {
    fontSize: "0.8rem",
    padding: "0.4rem 0.8rem",
  },
}));

const TodoTask = styled("p")(({ isComplete }) => ({
  fontFamily: "'Dongle', sans-serif",
  fontSize: "1.5rem",
  margin: "10px 0",
  color: isComplete ? "#ddd" : "#555",
  textDecoration: isComplete ? "line-through" : "none",
}));

const TodoItem = ({ item, idx, deleteItem, toggleComplete }) => {
  return (
    <TodoItemContainer container spacing={2} key={idx}>
      <Grid2 size={"grow"}>
        <TodoTask isComplete={item.isComplete}>{item.task}</TodoTask>
      </Grid2>
      <Grid2>
        <ButtonWrapper>
          <ButtonDelete
            onClick={() => deleteItem(item._id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Del
          </ButtonDelete>
          {item.isComplete ? (
            <ButtonUndone
              onClick={() => toggleComplete(item._id)}
              variant="outlined"
              startIcon={<UndoIcon />}
            >
              Undo
            </ButtonUndone>
          ) : (
            <ButtonDone
              onClick={() => toggleComplete(item._id)}
              variant="outlined"
              startIcon={<CheckIcon />}
            >
              Done
            </ButtonDone>
          )}
        </ButtonWrapper>
      </Grid2>
    </TodoItemContainer>
  );
};

export default TodoItem;
