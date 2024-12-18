import { createContext, useContext, useState, ReactNode } from 'react';
import { useUser } from './User';

interface AuthContextType {
  token: string | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { setUserData, clearUserData } = useUser();

  const login = (newToken: string, userData: UserData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUserData(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    clearUserData();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};