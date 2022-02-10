import { findAndSet } from './usersData';

// Basic Login and Logout functions

function login(setUser, user = null, handleCookie) {
  findAndSet(setUser, user.email, user.password, handleCookie);
}

function logout(setUser, destroyCookie) {
  setUser(null);
  destroyCookie();
}

export { login, logout };
