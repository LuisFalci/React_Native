import React, {useState, createContext, ReactNode} from "react";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
}

type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string,
}

type AuthProviderProps = {
    children: ReactNode;
}

// Nosso context criado precisa respeitar o nossas tipagens do AuthContextData 
export const AuthContext = createContext({} as AuthContextData);

// AuthProvider contém toda a aplicação, tudo que ele receber vem de suas filhas (children)
// No typescript não podemos apenas receber o children, precisamos criar uma tipagem para ele 
export function AuthProvider({children}: AuthProviderProps){
    // <UserProps> -> obriga o state a seguir a tipagem do UserProps
    const [user, setUser] = useState<UserProps>({
        id:"",
        name:"",
        email:"",
        token:""
    })
    // !! converte para boolean
    const isAuthenticated = !!user.name;

    return(
        <AuthContext.Provider value={{user, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}