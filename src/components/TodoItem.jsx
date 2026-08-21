import React from "react";
import { Form, Button, ListGroupItem } from "react-bootstrap";

function TodoItem({
  task,
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
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      {/* Task */}
      <div className="d-flex align-items-center flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="me-3"
        />

        {editingId === task.id ? (
          <Form.Control
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEdit(task.id);
              }

              if (e.key === "Escape") {
                cancelEdit();
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className={
              task.completed ? "text-decoration-line-through text-muted" : ""
            }
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="ms-3 d-flex gap-2">
        {editingId === task.id ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => saveEdit(task.id)}
            >
              Save
            </Button>

            <Button variant="secondary" size="sm" onClick={cancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={task.completed ? "secondary" : "success"}
              size="sm"
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </Button>

            <Button variant="warning" size="sm" onClick={() => startEdit(task)}>
              Edit
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </ListGroupItem>
  );
}

export default TodoItem;
