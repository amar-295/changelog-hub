/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.data || response);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    // The backend returns an ApiResponse: { statusCode, data: { user }, message }
    // authService returns response.data (the ApiResponse itself).
    setUser(response.data?.data?.user || response.data?.user || response.user);
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    // Extracted property correctly
    setUser(response.data?.data?.user || response.data?.user || response.user);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="min-h-screen flex items-center justify-center text-slate-400">
          Loading...
        </div>
      )}
    </AuthContext.Provider>
  );
};
