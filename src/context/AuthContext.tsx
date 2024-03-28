import { setCookie } from "nookies";
import { createContext, useState } from "react";
import Router from "next/router";
import { api } from "@/services";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<any>;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type dataType = {
  is_superuser: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;
  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("token/", {
        email,
        password,
      });
      setCookie(undefined, "psi-token", response.data.access);

      setCookie(undefined, "psi-refreshToken", response.data.refresh);
      if (response.data.access) {
        setToken(response.data.access);
      }
      const data: dataType = jwtDecode(response.data.access);
      if (data?.is_superuser) {
        Router.push("/dashboard");
      } else {
        Router.push("/inicio");
      }
    } catch (error: any) {
      return true;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
