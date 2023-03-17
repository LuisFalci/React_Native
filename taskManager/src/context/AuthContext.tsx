import React, { useState, createContext, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

// AuthContextData contém aquilo que queremos disponibilizar para toda aplicação.
// singIn precisa ter a tipagem SingInProps e como é uma função assíncrona e que
// pode demorar nós definimos que ela retorna uma Promise porém vazia <void>
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  singIn: (credentials: SingInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  singOut: () => Promise<void>;
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

  // loadingAuth controla se tá carregando
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // !! converte para boolean
  const isAuthenticated = !!user.name;

  // Ao iniciar o app, verifica se tem user salvo e se sim, pula a parte de login
  useEffect(() => {
    async function getUser() {
      // pegar os dados salvos do user (foram salvos como string)
      const userInfo = await AsyncStorage.getItem("user");
      // transformamos em obj a string obtida, caso não tenha user criamos um obj vazio
      let hasUser = JSON.parse(userInfo || "{}");
      // Verificar se recebemos as informações dele
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Beater ${hasUser.token}`;
        setUser({
          id: hasUser.user.id,
          name: hasUser.user.name,
          email: hasUser.user.email,
          token: hasUser.token,
        });
      }
      setLoading(false);
    }
    getUser();
  }, []);

  async function singIn({ email, password }: SingInProps) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      const { _id, name } = response.data.user;
      const { token } = response.data;
      const data = {
        ...response.data,
      };

      // Com o AsyncStorage guardamos as informações de forma offline do user
      // com isso, o usuário loga direto se houver token guardado no banco
      await AsyncStorage.setItem("user", JSON.stringify(data));

      // define para todas as posteriores requisições que o token seja enviado
      api.defaults.headers.common["Authorization"] = `Beater ${token}`;

      setUser({
        id: _id,
        name,
        email,
        token,
      });
      setLoadingAuth(false);
    } catch (error) {
      console.log("Erro ao acessar", error);
      setLoadingAuth(false);
    }
  }

  async function singOut() {
    // remove todas as informações do user do storage
    await AsyncStorage.clear().then(() => {
      // faz user ficar vazio
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, singIn, loadingAuth, loading, singOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
