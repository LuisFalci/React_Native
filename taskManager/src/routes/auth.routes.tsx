// auth.routes possui as telas dos usuários não logados

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingIn from "../pages/SignIn";

// Tipo de navegação stack (pilha)
const Stack = createNativeStackNavigator();

// options={{headerShown:false}} -> remove o texto padrão gerado pela lib

function AuthRoutes(){
    return(
        // Container que envolve a tela
        <Stack.Navigator>
            <Stack.Screen name="SingIn" component={SingIn} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;