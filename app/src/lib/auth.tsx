import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AppUser } from '../types';
import { uuid } from './id';

// Local mock auth (persists in the browser). Supabase wires in here when
// VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are provided.
type AuthState = {
  user: AppUser | null;
  ready: boolean;
  signUp: (email: string, password: string, name: string, organisation?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const KEY_USERS = 'trafiqo.users';
const KEY_SESSION = 'trafiqo.session';

const AuthCtx = createContext<AuthState | null>(null);

type StoredUser = AppUser & { password: string };

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_USERS) || '[]');
  } catch {
    return [];
  }
}
function saveUsers(u: StoredUser[]) {
  localStorage.setItem(KEY_USERS, JSON.stringify(u));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY_SESSION);
      if (s) setUser(JSON.parse(s));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = (u: AppUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(KEY_SESSION, JSON.stringify(u));
    else localStorage.removeItem(KEY_SESSION);
  };

  const signUp: AuthState['signUp'] = async (email, password, name, organisation) => {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('exists');
    }
    const u: StoredUser = { id: uuid(), email, name, organisation, password };
    users.push(u);
    saveUsers(users);
    const { password: _pw, ...safe } = u;
    persist(safe);
  };

  const signIn: AuthState['signIn'] = async (email, password) => {
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) throw new Error('invalid');
    const { password: _pw, ...safe } = found;
    persist(safe);
  };

  const signOut = () => persist(null);

  return (
    <AuthCtx.Provider value={{ user, ready, signUp, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
