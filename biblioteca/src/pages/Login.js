import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { login } from "../services/authService"


const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const data = {
            email: email,
            password: password,
        }
        login(data)
    }

    return (
        <View>
            <TextInput
                placeholder="Username"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Go to register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}

export default Login;