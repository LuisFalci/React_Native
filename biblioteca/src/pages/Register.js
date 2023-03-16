import React from 'react';
import { View, TextInput, Button } from 'react-native';

const Register = ({ navigation }) => {
    return (
        <View>
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" secureTextEntry />
        <Button title="Register" onPress={() => {}} />
        <Button title="Back to Login" onPress={() => navigation.goBack()} />
      </View>
    )
}

export default Register;