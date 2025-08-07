import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'doctor' | 'patient' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: UserRole;
  setIsLoggedIn: (value: boolean) => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        setIsLoggedIn,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}