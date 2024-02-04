import "./home.css";
import { Link } from "react-router-dom";
import { isUserLoggedIn } from "../../userLoggedIn";

export default function Home() {
  return (
    <div className="home">
      <h1 className="mainStatement">Welcome to Todoist</h1>
      <div className="loginAndSignup">
        {!isUserLoggedIn() ? (
          <>
            <Link to="/login">
              <button className="loginButton">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signupButton">SignUp</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/task">
              <button className="todoistButton">Go to task dashboard</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
