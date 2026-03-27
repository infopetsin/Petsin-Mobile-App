import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokenStorage, isTokenExpired, decodeJWT } from '../lib/tokenStorage';
import { refreshTokens, signOut as authSignOut } from '../services/authService';
import type { Profile } from '../types';

type SessionUser = {
  id: string;
  email: string;
  role: string;
};

type AuthState = {
  user: SessionUser | null;
  profile: Profile | null;
  initialized: boolean;
};

type AuthContextType = AuthState & {
  setSession: (user: SessionUser, profile?: Profile | null) => void;
  clearSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    initialized: false,
  });

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const accessToken = await tokenStorage.getAccessToken();
      if (!accessToken) {
        setState(prev => ({ ...prev, initialized: true }));
        return;
      }

      if (isTokenExpired(accessToken)) {
        const refreshed = await refreshTokens();
        if (!refreshed) {
          setState(prev => ({ ...prev, initialized: true }));
          return;
        }
        const newToken = await tokenStorage.getAccessToken();
        if (newToken) loadUserFromToken(newToken);
        return;
      }

      loadUserFromToken(accessToken);
    } catch {
      setState(prev => ({ ...prev, initialized: true }));
    }
  }

  function loadUserFromToken(token: string) {
    const payload = decodeJWT(token);
    if (!payload?.sub) {
      setState(prev => ({ ...prev, initialized: true }));
      return;
    }
    setState({
      user: {
        id: payload.sub as string,
        email: payload.email as string,
        role: (payload.role as string) || 'user',
      },
      profile: null,
      initialized: true,
    });
  }

  function setSession(user: SessionUser, profile?: Profile | null) {
    setState(prev => ({ ...prev, user, profile: profile ?? prev.profile, initialized: true }));
  }

  async function clearSession() {
    await authSignOut();
    setState({ user: null, profile: null, initialized: true });
  }

  return (
    <AuthContext.Provider value={{ ...state, setSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
