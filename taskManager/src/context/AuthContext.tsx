import React, { useState, createContext, ReactNode } from "react";

// AuthContextData contém aquilo que queremos disponibilizar para toda aplicação.
// singIn precisa ter a tipagem SingInProps e como é uma função assíncrona e que 
// pode demorar nós definimos que ela retorna uma Promise porém vazia <void>
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  singIn: (credentials: SingInProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SingInProps = {
  email: string;
  password: string;
};

// Nosso context criado precisa respeitar o nossas tipagens do AuthContextData
export const AuthContext = createContext({} as AuthContextData);

// AuthProvider contém toda a aplicação, tudo que ele receber vem de suas filhas (children)
// No typescript não podemos apenas receber o children, precisamos criar uma tipagem para ele
export function AuthProvider({ children }: AuthProviderProps) {
  // <UserProps> -> obriga o state a seguir a tipagem do UserProps
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });
  // !! converte para boolean
  const isAuthenticated = !!user.name;

  async function singIn({ email, password }: SingInProps) {
    console.log(email)
    console.log(password)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}
