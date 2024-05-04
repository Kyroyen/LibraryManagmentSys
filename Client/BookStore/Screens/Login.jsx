import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await axios.post(
        'http://192.168.58.124:8000/api/token/',
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      await AsyncStorage.setItem('token', token.data.access);
      if (token.status === 200) {
        navigation.navigate('HomeScreen');
      } else {
        console.error('Login failed:', token.data);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.title}>Welcome Back 👏</Text>
        <Text style={styles.Secondtitle}>Log In to your account!</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.forgotPass}>
        <TouchableOpacity>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 70,
    color: '#1f66e0',
    justifyContent: 'flex-end',
  },
  Secondtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f66e0',
    justifyContent: 'flex-end',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 60,
    padding: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    padding: 15,
    paddingHorizontal: 100,
    backgroundColor: '#185bce',
    borderRadius: 15,
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  forgotPass: {
    padding: 10,
  },
});

export default LoginScreen;
