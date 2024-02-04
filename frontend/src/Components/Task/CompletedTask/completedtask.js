import React from "react";
import TaskItem from "../Todolist/TaskItem";

const Completedtask = ({ tasks }) => {
  return (
    <div className="completedTaskList">
      <div className="card border-primary text-white bg-success mb-3">
        <h2 className="card-header info">completed</h2>
      </div>
      {tasks && tasks.map((task) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
};

export default Completedtask;
