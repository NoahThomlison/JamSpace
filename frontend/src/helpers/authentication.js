// Basic Login and Logout functions

function login(setUser, user = null) {
  setUser(user);
}

function logout(setUser) {
  setUser(null);
}

export { login, logout };
