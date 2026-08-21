import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import TodoItem from "./TodoItem";

function TodoList({
  tasks,
  editingId,
  editText,
  setEditText,
  toggleTask,
  deleteTask,
  startEdit,
  saveEdit,
  cancelEdit,
}) {
  return (
    <ListGroup className="mt-4">
      {tasks.length === 0 ? (
        <ListGroupItem className="text-center text-muted py-4">
          No tasks found enjoy your day! 🎉
        </ListGroupItem>
      ) : (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        ))
      )}
    </ListGroup>
  );
}

export default TodoList;
