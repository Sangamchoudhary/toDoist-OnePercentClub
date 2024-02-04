export function isUserLoggedIn() {
  return localStorage.getItem('login');
  // return document.cookie
  //   .split("; ")
  //   .filter((row) => row.startsWith("login"))
  //   .map((c) => c.split("=")[1])[0];
}
