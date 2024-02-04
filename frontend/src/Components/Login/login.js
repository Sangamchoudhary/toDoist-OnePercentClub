import "./login.css";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function login(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "Post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      alert("Logged in successfully");
      const data = await response.json();
      localStorage.setItem('login', data.login);
      setRedirect(true);
    } else {
      alert("Login failed, wrong credentials");
    }
  }

  if (redirect) {
    window.location.reload();
    return <Navigate to={"/"} />;
  }

  return (
    <div className="Loginbox">
      <form className="login" onSubmit={login}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Enter your email-id"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>

        <a href="/signup">New User? signup Here</a>
        <hr />

        <button className="loginBtn">Login</button>
      </form>
    </div>
  );
}
