import { StyleSheet, Text, View, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

// routes
import Routes from "./src/routes";

// context
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor="#1d1d2e"
          barStyle="light-content"
          translucent={false}
        />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
