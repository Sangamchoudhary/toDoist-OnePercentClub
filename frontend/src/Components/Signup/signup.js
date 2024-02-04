import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./signup.css";
import { isUserLoggedIn } from "../../userLoggedIn";
export default function SignupPage() {
  if(isUserLoggedIn()){ <Navigate to={"/"} /> }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function signup(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "Post",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      alert("Registration is successful");
      setRedirect(true);
    } else {
      alert("Registration failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="signupbox">
      <form className="signup" onSubmit={signup}>
        <h1>Register user</h1>
        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Enter your emailId"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Enter your Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>

        <a href="/login">Already a User? login Here</a>
        <hr />

        <button className="signupBtn">signup</button>
      </form>
    </div>
  );
}
