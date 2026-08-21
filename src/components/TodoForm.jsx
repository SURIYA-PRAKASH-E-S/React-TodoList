import React from "react";
import { Form, Button } from "react-bootstrap";

function TodoForm({ newTask, setNewTask, addTask, inputRef }) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addTask();
      }}
    >
      <Form.Group controlId="formNewTask">
        <Form.Label className="text-light fw-bold">New Task</Form.Label>

        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </Form.Group>

      <Button variant="success" type="submit" className="mt-3 w-100">
        Add Task
      </Button>
    </Form>
  );
}

export default TodoForm;
