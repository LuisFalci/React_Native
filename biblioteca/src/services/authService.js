import axios from 'axios';
const URL = "http://192.168.0.187:5000/api/"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (data) => {
    axios.post(`${URL}user/login`, data)
        .then(async response => {
            await AsyncStorage.setItem('token', response.data.token)
        })
        .catch(error => {
            console.error(error);
        });
}
