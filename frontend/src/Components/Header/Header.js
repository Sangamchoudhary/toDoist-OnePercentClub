import { Link } from "react-router-dom";
import { isUserLoggedIn } from "../../userLoggedIn";
import "./Header.css";

export default function Header() {
  async function logout() {
    await fetch("http://localhost:4000/api/user/logout", {
      credentials: "include",
      method: "GET",
    });
    localStorage.removeItem('login');
    window.location.reload();
  }
  
  return (
    <header>
      <Link to="/" className="Logo">
        1% CLUB - TODIST
      </Link>
      <nav>
        {isUserLoggedIn() && (
          <>
            <Link to="/">
              <button class="logoutButton" onClick={logout}>
                Logout
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
