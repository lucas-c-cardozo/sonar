import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const STORAGE_KEY = 'sonar-auth-user';
const USERS_KEY = 'sonar-users';

function readStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as StoredUser[];
  } catch {
    return [];
  }
}

function writeStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as AuthUser;
      setUser(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = readStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, error: 'E-mail ou senha inválidos.' };
    }

    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    }

    setUser(sessionUser);
    return { success: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password) {
      return { success: false, error: 'Preencha todos os campos.' };
    }

    const users = readStoredUsers();
    const emailExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);

    if (emailExists) {
      return { success: false, error: 'Este e-mail já está cadastrado.' };
    }

    const newUser: StoredUser = {
      id: uuidv4(),
      name: trimmedName,
      email: normalizedEmail,
      password,
    };

    const updatedUsers = [...users, newUser];
    writeStoredUsers(updatedUsers);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    }

    setUser(sessionUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(null);
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
