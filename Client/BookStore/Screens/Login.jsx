import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.title}>Welcome Back 👏</Text>
        <Text style={styles.Secondtitle}>Log In to your account!</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}>
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
    color: '#DD5746',
    justifyContent: 'flex-end',
  },
  Secondtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DD5746',
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
    backgroundColor: '#DD5746',
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