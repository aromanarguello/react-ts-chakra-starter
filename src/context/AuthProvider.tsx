import React, { createContext, ReactNode, useState } from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  accessToken: string;
  role: string;
  isLoggedIn: boolean;
}

interface AuthContext {
  auth: AuthState;
  setAuth?: Dispatch<SetStateAction<AuthState>>;
}

const initialState = {
  auth: {
    accessToken: '',
    role: '',
    isLoggedIn: false,
  },
};

const AuthContext = createContext<AuthContext>(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({
    accessToken: '',
    role: '',
    isLoggedIn: false,
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
