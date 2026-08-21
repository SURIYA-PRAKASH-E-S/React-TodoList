import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

function TodoFilter({ filter, setFilter, total, completed, incomplete }) {
  return (
    <div className="mt-4">
      <ButtonGroup className="w-100">
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          onClick={() => setFilter("all")}
        >
          All ({total})
        </Button>

        <Button
          variant={filter === "completed" ? "success" : "outline-success"}
          onClick={() => setFilter("completed")}
        >
          Completed ({completed})
        </Button>

        <Button
          variant={filter === "incomplete" ? "warning" : "outline-warning"}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete ({incomplete})
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TodoFilter;
