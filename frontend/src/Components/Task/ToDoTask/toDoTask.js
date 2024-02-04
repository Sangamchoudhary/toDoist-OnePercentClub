import React from "react";
import TaskItem from "../Todolist/TaskItem";
import "./toDoTask.css";

const ToDoTask = ({ sortByPriority, tasks }) => {
  return (
    <div className="toDoList">
      <div className="card text-white bg-info mb-3">
        <h2 className="card-header info">to-do</h2>
        <h3 className="card-title">
          sort by priority -{" "}
          <i
            className="people-line fas fa-people-line mx1"
            style={{ color: "black" }}
            onClick={() => sortByPriority()}
          />
        </h3>
      </div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default ToDoTask;
