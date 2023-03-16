// auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkAuthentication = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default checkAuthentication;
