import React from "react";
import TaskItem from "../Todolist/TaskItem";

const Pendingtask = ({ tasks }) => {
  return (
    <div className="pendingTaskList">
      <div className="card text-white bg-warning mb-3">
        <h2 className="card-header info">pending</h2>
      </div>
      {tasks && tasks.map((task) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
};

export default Pendingtask;
