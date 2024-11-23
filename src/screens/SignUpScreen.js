import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      Alert.alert('Success', 'You have signed up successfully!');
      navigation.navigate('SignIn');  
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/signInBg.jpg')} 
      style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUpScreen;
