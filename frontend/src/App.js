import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./Components/Home/home";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import Task from "./Components/Task/task";
import TaskState from "./Context/taskState";
import { isUserLoggedIn } from "./userLoggedIn";

function App() {
  return (
    <TaskState>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          {!isUserLoggedIn() && <Route path={"/signup"} element={<Signup />} />}
          {!isUserLoggedIn() && <Route path={"/login"} element={<Login />} />}
          {isUserLoggedIn() && <Route path={"/task"} element={<Task />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </TaskState>
  );
}

export default App;
