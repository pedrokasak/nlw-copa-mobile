import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {
    console.log("Logged");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Pedro Henrique",
          avatarUrl: "https://github.com/pedrokasak.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
