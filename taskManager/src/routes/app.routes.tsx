// app.routes possui as telas dos usuários logados

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import TaskBoard from "../pages/TaskBoard";

const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    // Container que envolve a tela
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      /> */}
           <Stack.Screen
        name="TaskBoard"
        component={TaskBoard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
