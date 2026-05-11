import { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS } from '../utils/storageKeys';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (email, password) => {
    // Only business logic here - NO format validation
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    // Only business logic here - NO format validation
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = { id: 'usr_' + Date.now(), name, email };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};