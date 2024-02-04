import { Alert } from "bootstrap";
import TaskContext from "./taskContext";
import { useState } from "react";

const TaskState = (props) => {
  const host = "http://localhost:4000";
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch(`${host}/api/task`, {
        credentials: "include",
      });
      if (!response.ok) Alert("Tasks fetching issue, try again");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      Alert("Error fetching todo list data:", error);
    }
  };

  const addTask = async (title, description, date, priority) => {
    try {
      const taskResponse = await fetch(`${host}/api/task`, {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          date,
          priority,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!taskResponse) throw "adding task failed, try again";
      const task = await taskResponse.json();
      // setTasks(tasks.concat(task));
      setTasks((tasks) => {
        console.log(tasks);
        const up = [...tasks, task.task]
        console.log(up);
        return up;
      });
    } catch (error) {
      Alert("adding task failed" - error);
    }
  };

  const updateTask = async (id, title, description, date, priority) => {
    try {
      const response = await fetch(`${host}/api/task/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title, description, date, priority }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw "Failed to fetch todo list data";
      await response.json();
      let newTasks = JSON.parse(JSON.stringify(tasks));
      for (let index = 0; index < newTasks.length; index++) {
        const element = newTasks[index];
        if (element._id === id) {
          newTasks[index].title = title;
          newTasks[index].description = description;
          newTasks[index].priority = priority;
          newTasks[index].date = date+"T00:00:00.000Z";
          break;
        }
      }
      console.log(newTasks);
      setTasks(newTasks);
    } catch (error) {
      Alert("Error fetching todo list data:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      const response = await fetch(`${host}/api/task/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isComplete: "true" }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) Alert("Failed to complete task, try again");
      let newTasks = JSON.parse(JSON.stringify(tasks));
      for (let index = 0; index < newTasks.length; index++) {
        const element = newTasks[index];
        if (element._id === id) {
          newTasks[index].isComplete = true;
          break;
        }
      }
      setTasks(newTasks);
    } catch (error) {
      Alert("Error while competing task - ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${host}/api/task/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) Alert("Failed to delete task, try again");
      const newTasks = tasks.filter((task) => {
        return task._id !== id;
      });
      setTasks(newTasks);
    } catch (error) {
      Alert("Error deleting task - ", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        completeTask,
        deleteTask,
        getTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
