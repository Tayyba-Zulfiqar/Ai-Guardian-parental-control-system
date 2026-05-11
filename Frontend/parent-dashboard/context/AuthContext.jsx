import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('ai_guardian_user');
      console.log('AuthContext Loading from localStorage:', storedUser);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Error loading user from localStorage:', e);
      return null;
    }
  });

  const login = (email, password) => {
    // Mock user login
    const mockUser = {
      id: 'usr_1',
      name: 'John Doe',
      email: email,
      token: 'mock_jwt_token'
    };
    console.log('AuthContext login() saving to localStorage:', mockUser);
    localStorage.setItem('ai_guardian_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return true;
  };

  const signup = (name, email, password) => {
    // Mock user signup
    const mockUser = {
      id: 'usr_2',
      name: name,
      email: email,
      token: 'mock_jwt_token'
    };
    console.log('AuthContext signup() saving to localStorage:', mockUser);
    localStorage.setItem('ai_guardian_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    console.log('AuthContext logout() removing from localStorage');
    localStorage.removeItem('ai_guardian_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


