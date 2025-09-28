'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  isScientist: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isScientist: false,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isScientist, setIsScientist] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a mock user for frontend demo
    setTimeout(() => {
      setUser({
        uid: 'demo-user',
        email: 'scientist@demo.com',
        displayName: 'Dr. Marine Scientist'
      });
      setIsScientist(true);
      setLoading(false);
    }, 1000);
  }, []);

  const logout = async () => {
    setUser(null);
    setIsScientist(false);
  };

  return (
    <AuthContext.Provider value={{ user, isScientist, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);