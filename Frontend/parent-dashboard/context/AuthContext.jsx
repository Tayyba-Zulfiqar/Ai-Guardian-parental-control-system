import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/storageKeys';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================
  // LOAD SESSION
  // ======================
  useEffect(() => {
    const storedUser = safeParse(
      localStorage.getItem(STORAGE_KEYS.USER),
      null
    );

    setUser(storedUser);
    setLoading(false);
  }, []);

  // ======================
  // LOGIN
  // ======================
  const login = (email, password) => {
    const users = safeParse(
      localStorage.getItem(STORAGE_KEYS.USERS),
      []
    );

    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    const { password: _, ...safeUser } = foundUser;

    const sessionUser = {
      ...safeUser,
      isAuthenticated: true,
    };

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(sessionUser)
    );

    setUser(sessionUser);

    return { success: true };
  };

  // ======================
  // SIGNUP
  // ======================
  const signup = (name, email, password) => {
    const users = safeParse(
      localStorage.getItem(STORAGE_KEYS.USERS),
      []
    );

    const existingUser = users.find(
      u => u.email === email
    );

    if (existingUser) {
      return {
        success: false,
        error: 'User already exists',
      };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify(users)
    );

    return { success: true };
  };

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  // ======================
  // UPDATE USER
  // ======================
  const updateUser = (newData) => {
    if (!user) return { success: false, error: 'No user logged in' };

    const users = safeParse(
      localStorage.getItem(STORAGE_KEYS.USERS),
      []
    );

    // Check if new email already exists for another user
    if (newData.email && newData.email !== user.email) {
      const emailExists = users.some(u => u.email === newData.email);
      if (emailExists) {
        return { success: false, error: 'Email already in use by another account' };
      }
    }

    const updatedUser = { ...user, ...newData };
    
    // Update current session
    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(updatedUser)
    );
    setUser(updatedUser);

    // Update in users list
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...newData } : u
    );
    localStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify(updatedUsers)
    );

    return { success: true };
  };

  // ======================
  // CHANGE PASSWORD
  // ======================
  const changePassword = (currentPassword, newPassword) => {
    if (!user) return { success: false, error: 'No user logged in' };

    const users = safeParse(
      localStorage.getItem(STORAGE_KEYS.USERS),
      []
    );

    const fullUser = users.find(u => u.id === user.id);

    if (!fullUser || fullUser.password !== currentPassword) {
      return { success: false, error: 'Incorrect current password' };
    }

    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, password: newPassword } : u
    );

    localStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify(updatedUsers)
    );

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};