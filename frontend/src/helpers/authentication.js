import { findAndSet } from './usersData';

// Basic Login and Logout functions

function login(setUser, user = null) {
  findAndSet(setUser, user.email);
}

function logout(setUser) {
  setUser(null);
}

export { login, logout };
