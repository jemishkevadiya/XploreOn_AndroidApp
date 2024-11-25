import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('HomeScreen'); // Navigate to Home after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/Splash.jpg')} // Background image
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Image
                    source={require('../../assets/logo.png')} // Logo image
                    style={styles.logo}
                />
                <Text style={styles.text}>Welcome to XploreOn</Text>
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
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Optional semi-transparent overlay
    },
    logo: {
        width: 70,
        height: 100,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default SplashScreen;
