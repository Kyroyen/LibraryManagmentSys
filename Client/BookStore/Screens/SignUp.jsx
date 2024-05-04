import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        'http://192.168.58.124:8000/api/register/',
        {
          email: email,
          firstname: FirstName,
          lastname: LastName,
          username: userName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        navigation.navigate('HomeScreen');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.title}>Welcome Reader👋</Text>
        <Text style={styles.secondTitle}>Create your account</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={FirstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={LastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    marginRight: 50,
    color: '#185bce',
    justifyContent: 'flex-end',
  },
  secondTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#185bce',
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
});

export default SignUpScreen;
