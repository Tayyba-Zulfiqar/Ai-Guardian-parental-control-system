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

  // ✅ LOGIN (single-user system)
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      const { password: _, ...safeUser } = storedUser;

      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify({
          ...safeUser,
          isAuthenticated: true,
        })
      );

      setUser({ ...safeUser, isAuthenticated: true });

      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };


  const signup = (name, email, password) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password, // only used internally for login check
    };

    const { password: _, ...safeUser } = newUser;

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify({
        ...safeUser,
        password, // keep for login validation (frontend only)
        isAuthenticated: true,
      })
    );

    setUser({ ...safeUser, isAuthenticated: true });

    return { success: true };
  };

  // ✅ LOGOUT
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