import { ActivityIndicator, View } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import {AuthContext} from "../context/AuthContext"
import { useContext } from "react";

function Routes() {
  // importa a prop isAuthenticated de AuthContext
  const {isAuthenticated, loading} = useContext(AuthContext)

  
  // se loading for true gera uma animação de carregamento
  if(loading){
    return(
      <View
      style={{
        flex:1,
        backgroundColor: "#1D1D2E",
        justifyContent: "center",
        alignItems:"center"
      }}
      >
        <ActivityIndicator size={60} color="#FFF" />
      </View>
    )
  }

  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  )
}

export default Routes;
