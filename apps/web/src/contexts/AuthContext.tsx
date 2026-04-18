import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch {
      const DEMO = {
        dg: { id: '1', username: 'dg', role: 'DG', name: 'Délégué Général' },
        cd: { id: '2', username: 'cd', role: 'COMMISSAIRE', name: 'Commissaire Divisionnaire' },
        op: { id: '3', username: 'op', role: 'OFFICIER', name: 'Officier de Police' },
        admin: { id: '4', username: 'admin', role: 'SUPER_ADMIN', name: 'Super Administrateur' }
      };
      const user = DEMO[username.toLowerCase()];
      if (user && password === '1234') {
        const fakeToken = btoa(JSON.stringify(user));
        setToken(fakeToken);
        setUser(user);
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
