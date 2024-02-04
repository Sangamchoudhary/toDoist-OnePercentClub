import React, { useContext } from "react";
import { useState, useEffect } from "react";
import PieChart from "./PieChart/PieChart";
import "./task.css";
import Completedtask from "./CompletedTask/completedtask";
import Pendingtask from "./PendingTask/pendingtask";
import AddTask from "./Todolist/addTask";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoTask from "./ToDoTask/toDoTask";
import TaskContext from "../../Context/taskContext";

function Task() {
  const [showChart, setShowChart] = useState(false);

  const context = useContext(TaskContext);
  const { tasks, setTasks, getTasks } = context;

  useEffect(() => {
    getTasks();
  }, []);

  const showPieChart = () => setShowChart(!showChart);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day}T00:00:00.000Z`;
  
  const completedTasks = tasks.filter((task) => task.isComplete);
  
  const dueTasks = tasks.filter((task) => !task.isComplete);

  const pendingTasks = dueTasks.filter(
    (task) => !task.isComplete && task.date === formattedDateTime
  );

  const sortTasksByPriority = () => {
    const sortedTasks = tasks.slice().sort((a, b) => a.priority - b.priority);
    setTasks(sortedTasks);
  };

  return (
    <div className="container">
      <div class="addTaskAndPieChar d-flex mb-3">
        <div class="me-auto p-2">
          <AddTask />
        </div>
        <div class="p-2"></div>
        <div class="p-2">
          <button onClick={showPieChart} class="btn btn-outline-primary">
            {showChart ? "Hide pie-chart" : "Show pie-chart"}
          </button>
        </div>
      </div>
      <div className="pie">
        {showChart && (
          <PieChart
            completed={completedTasks.length}
            pending={pendingTasks.length}
            due={dueTasks.length}
            width={300}
            height={300}
          />
        )}
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-4 text-center">
          <ToDoTask tasks={dueTasks} sortByPriority={sortTasksByPriority} />
        </div>
        <div className="col-sm-4 text-center">
          <Pendingtask tasks={pendingTasks} />
        </div>
        <div className="col-sm-4 text-center">
          <Completedtask tasks={completedTasks} />
        </div>
      </div>
    </div>
  );
}
export default Task;
