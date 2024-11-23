import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (email === storedEmail && password === storedPassword) {
        Alert.alert('Success', 'You have signed in successfully!');
        navigation.navigate('ServicesScreen');  
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');  
  };

  return (
    
    <ImageBackground
      source={require('../../assets/signInBg.jpg')} 
      style={styles.background}>
    <View>
      <Text style={styles.title}>Sign In</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Navigation to Sign Up */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
 
  title: {
    fontSize: 50,
    marginLeft: 90,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    alignItems: 'center'
  },
  input: {
    height: 50,
    width: 350,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 9,
    paddingHorizontal: 10,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4a2500',
    padding: 10,
    height: 50,
    marginLeft: 70,
    borderRadius: 60,
    alignItems: 'center',
    marginVertical: 10,
    width: '200',
  },
  buttonText: {
    color: '#ffffff',
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 50,
    fontSize: 16,
  },
});

export default SignInScreen;
