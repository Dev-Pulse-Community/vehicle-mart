import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import api, { apiError } from '../api/client';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(!!localStorage.getItem('ad_token'));

  const loadProfile = useCallback(async () => {
    if (!localStorage.getItem('ad_token')) {
      setAuthLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/profile');
      setCurrentUser(data.data);
    } catch {
      localStorage.removeItem('ad_token');
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ---- Auth ----
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/login', { email, password });
      localStorage.setItem('ad_token', data.token);
      await loadProfile();
      return { ok: true, user: data.data };
    } catch (error) {
      return { ok: false, error: apiError(error, 'Unable to sign in.') };
    }
  };

  const register = async ({ name, email, password, confirm, phone }) => {
    try {
      const { data } = await api.post('/register', {
        name, email, password, password_confirmation: confirm, phone,
      });
      localStorage.setItem('ad_token', data.token);
      await loadProfile();
      return { ok: true, user: data.data };
    } catch (error) {
      return { ok: false, error: apiError(error, 'Unable to create account.') };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      // token may already be invalid — clearing locally is what matters
    }
    localStorage.removeItem('ad_token');
    setCurrentUser(null);
  };

  // ---- Profile ----
  const updateProfile = async (values) => {
    try {
      const { data } = await api.put('/profile', values);
      setCurrentUser((prev) => ({ ...prev, ...data.data }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: apiError(error) };
    }
  };

  const changePassword = async ({ current, next }) => {
    try {
      await api.put('/profile/password', {
        current_password: current,
        password: next,
        password_confirmation: next,
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: apiError(error) };
    }
  };

  // ---- Favorites ----
  const toggleFavorite = async (carId) => {
    if (!currentUser) return { ok: false };
    try {
      const { data } = await api.post(`/favorites/${carId}/toggle`);
      setCurrentUser((prev) => ({
        ...prev,
        favorites: data.favorited
          ? [...prev.favorites, carId]
          : prev.favorites.filter((id) => id !== carId),
      }));
      return { ok: true, favorited: data.favorited };
    } catch (error) {
      return { ok: false, error: apiError(error) };
    }
  };

  const value = useMemo(
    () => ({
      currentUser, authLoading,
      login, register, logout,
      updateProfile, changePassword, toggleFavorite,
    }),
    [currentUser, authLoading] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
