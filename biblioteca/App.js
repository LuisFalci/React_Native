import { StyleSheet, View } from 'react-native';
import Title from './src/components/Title';

// screens
import Login from "./src/pages/Login"
import Register from './src/pages/Register';

// hooks
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

import checkAuthentication from './auth';
import Task from './src/pages/Task';

const Stack = createStackNavigator();

export default function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication().then((isAuthenticated) => {
      setAuthenticated(isAuthenticated);
    });
  }, [authenticated]);

  console.log(authenticated)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen name="Task" component={Task} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer >
  );
}