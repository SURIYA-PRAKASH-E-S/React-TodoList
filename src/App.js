import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

import TodoForm from "./components/TodoForm";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

function App() {
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const inputRef = useRef(null);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Focus input when page loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Add task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      };

      setTasks([...tasks, newTaskObject]);
      setNewTask("");

      inputRef.current.focus();
    }
  };

  // Toggle task
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Save edit
  const saveEdit = (id) => {
    if (editText.trim() === "") {
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: editText.trim() }
        : task
    );

    setTasks(updatedTasks);

    setEditingId(null);
    setEditText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "incomplete") {
      return !task.completed;
    }

    return true;
  });

  // Count completed and incomplete tasks
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const incompleteCount = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <>
      <header className="github-header">
        <a
          href="https://github.com/SURIYA-PRAKASH-E-S/React-TodoList"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
      </header>
      <Container className="py-5">

        <Row className="justify-content-md-center">
          <Col md={8} lg={6}>

            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="fw-bold text-light bg-primary p-3 rounded">
                Routine Todo Lists 📝
              </h1>

              <p className="text-light fs-5 bg-dark p-2 rounded">
                Manage your daily tasks  👉  <span className="text-success fw-bold">{new Date().toLocaleDateString()}</span>
              </p>
            </div>

            {/* Add Task */}
            <TodoForm
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
              inputRef={inputRef}
            />

            {/* Filter */}
            <TodoFilter
              filter={filter}
              setFilter={setFilter}
              total={tasks.length}
              completed={completedCount}
              incomplete={incompleteCount}
            />

            {/* List */}
            <TodoList
              tasks={filteredTasks}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              startEdit={startEdit}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
            />

            {/* Summary */}
            <div className="text-center mt-4">
              <Badge bg="primary" className="me-2">
                Total: {tasks.length}
              </Badge>

              <Badge bg="success" className="me-2">
                Completed: {completedCount}
              </Badge>

              <Badge bg="warning" text="dark">
                Remaining: {incompleteCount}
              </Badge>
            </div>

          </Col>
        </Row>
        <footer className="text-center text-light mt-5">
          <p>&copy; 2026 Routine Todo Lists. All rights reserved.</p>
        </footer>
      </Container>

    </>
  );
}

export default App;