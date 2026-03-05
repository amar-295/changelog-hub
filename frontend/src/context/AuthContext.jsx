/**
 * @module AuthContext
 * Provides global authentication state (user, loading, isAuthenticated)
 * and actions (login, register, logout) to the entire React tree.
 *
 * On mount: calls /auth/me to hydrate user from existing session.
 * On session expiry: listens for the 'session-expired' window event
 * dispatched by the Axios token-refresh interceptor.
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        // Single request instead of validate → getCurrentUser serial waterfall.
        // /auth/me returns user data and implicitly validates the session.
        const userResponse = await authService.getCurrentUser();
        if (!cancelled) {
          setUser(userResponse.data || userResponse);
        }
      } catch {
        // 401 / network error → not authenticated
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkAuth();

    const handleSessionExpired = () => {
      setUser(null);
    };

    window.addEventListener('session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('session-expired', handleSessionExpired);
    };
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
