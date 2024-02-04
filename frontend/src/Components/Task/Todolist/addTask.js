import React, { useContext, useState } from "react";
import TaskForm from "./TaskForm";
import TaskContext from "../../../Context/taskContext";
import "./addTask.css";

const AddTask = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const context = useContext(TaskContext);
  const { getTasks } = context;
  const handleAddTask = () => {
    setShowForm(true);
    getTasks();
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={handleAddTask} className="btn btn-outline-danger">
        Add New Task
      </button>
      {showForm && <TaskForm onSubmit={onAdd} onCancel={handleCancel} />}{" "}
    </div>
  );
};

export default AddTask;
