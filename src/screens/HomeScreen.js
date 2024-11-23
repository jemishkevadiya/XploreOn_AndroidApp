import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/HomeScreenBG.jpg')} // Background image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Main Heading */}
        <Text style={styles.mainHeading}>Plan Your Journey Beyond Limits</Text>

        {/* Sub Heading */}
        <Text style={styles.subHeading}>Embark on your next great adventure today, where every journey 
            becomes a story worth telling.</Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('NextScreen'); // Replace 'NextScreen' with your target screen name
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns content to the bottom
    paddingHorizontal: 20,
    paddingBottom: 50, // Adds spacing above the button
  },
  mainHeading: {
    fontSize: 60,
    fontWeight: 'condensed',
    color: '#ffffff', // Adjust to contrast with the background
    textAlign: 'left',
    marginBottom: 30,
  },
  subHeading: {
    fontSize: 20,
    color: '#dcdcdc', // Adjust to contrast with the background
    textAlign: 'left',
    marginBottom: 90,
  },
  button: {
    position: 'absolute',
    bottom: 80, // Adjust to fine-tune position
    right: 20, // Aligns the button to the bottom-right
    backgroundColor: '#ff6f00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
