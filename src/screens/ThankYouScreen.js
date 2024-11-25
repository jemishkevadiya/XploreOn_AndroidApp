import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThankYouPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/thankyou-BG.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Thank You Heading */}
        <Text style={styles.heading}>Thank You!</Text>

        {/* Subheadings */}
        <Text style={styles.subheading}>We appreciate your trust in us.</Text>
        <Text style={styles.subheading}>Your booking was successful!</Text>

        {/* Button to Navigate to ServicesScreen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ServicesScreen')}
        >
          <Ionicons name="arrow-forward-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Back to Services</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6f00',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ThankYouPage;