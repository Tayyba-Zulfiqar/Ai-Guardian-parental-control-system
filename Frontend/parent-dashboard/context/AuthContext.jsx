import { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS } from '../utils/storageKeys';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// helper
const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {

  // session user (ONLY for login state)
  const [user, setUser] = useState(() => {
    return safeParse(localStorage.getItem(STORAGE_KEYS.USER), null);
  });

  // ======================
  // LOGIN
  // ======================
  const login = (email, password) => {
    const users = safeParse(localStorage.getItem(STORAGE_KEYS.USERS), []);

    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    const { password: _, ...safeUser } = foundUser;

    const sessionUser = {
      ...safeUser,
      isAuthenticated: true,
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  };

  // ======================
  // SIGNUP (FIXED)
  // ======================
  const signup = (name, email, password) => {
    const users = safeParse(localStorage.getItem(STORAGE_KEYS.USERS), []);

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      hasChildConnected: false, // IMPORTANT for your flow
    };

    users.push(newUser);

    localStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify(users)
    );

    // ❌ IMPORTANT FIX:
    // DO NOT auto login
    // DO NOT set user state

    return { success: true };
  };

  // ======================
  // CONNECT CHILD (NEW IDEA)
  // ======================
  const connectChild = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      hasChildConnected: true,
    };

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      connectChild
    }}>
      {children}
    </AuthContext.Provider>
  );
};