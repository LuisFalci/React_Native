import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, TextInput, Button } from 'react-native';
import checkAuthentication from '../../auth';

const Task = ({ navigation }) => {

  const handleLogout = async () => {
    try {
      // Remove o token armazenado do AsyncStorage
      await AsyncStorage.removeItem('token');
      checkAuthentication();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <TextInput placeholder="Task" />
      <Button title="add" onPress={() => { }} />
      <Button title="logout" onPress={handleLogout} />
    </View>
  )
}

export default Task;