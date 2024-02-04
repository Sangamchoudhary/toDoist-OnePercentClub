import React, { useContext, useState } from "react";
import TaskContext from "../../../Context/taskContext";
import TaskForm from "./TaskForm";
import "./TaskItem.css";
const TaskItem = ({ task }) => {
  const { _id, title, description, date, priority, isComplete } = task;
  const context = useContext(TaskContext);
  const { deleteTask, completeTask } = context;
  const originalDate = new Date(date);
  const formattedDate = `${originalDate.getFullYear()}-${String(
    originalDate.getMonth() + 1
  ).padStart(2, "0")}-${String(originalDate.getDate()).padStart(2, "0")}`;

  const [showForm, setShowForm] = useState(false);

  const handleEditTask = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div
      className={`task-item card border-dark bg-${isComplete ? "success" : "info"}-subtle mb-3`}  
      style={{ maxWidth: "23rem" }}
    >
      <div class="card-header bg-transparent border-secondary">
        {title} -{" "}
        <span
          class={`badge text-bg-${
            priority == 1 ? "danger" : priority == 2 ? "warning" : "info"
          }`}
        >
          P{priority}
        </span>
      </div>
      <div class="card-body text-dark">
        <p class="card-text">{description}</p>
      </div>
      <div class="card-footer bg-transparent border-secondary">
        <div class="bg-transparent border-success">Date: {formattedDate}</div>
      </div>
      {showForm && <TaskForm onCancel={handleCancel} olderTask={task} />}{" "}
      <div className="d-flex justify-content-between">
        {!isComplete && (
          <button
            className="utility-button bg-transparent"
            onClick={() => completeTask(_id)}
          >
            {" "}
            <i className="fas fa-check mx1" style={{ color: "green" }} />
          </button>
        )}
        <button
          className="utility-button bg-transparent"
          onClick={handleEditTask}
        >
          {" "}
          <i className="far fa-edit mx1" style={{ color: "darkblue" }}></i>
        </button>
        <button
          className="utility-button bg-transparent"
          onClick={() => deleteTask(_id)}
        >
          {" "}
          <i
            className="icon-link icon-link-hover fas fa-trash mx-1"
            style={{ color: "darkred" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
