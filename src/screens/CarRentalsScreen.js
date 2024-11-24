import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView,
    ScrollView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const HotelBooking = ({ navigation }) => {

    const [tripType, setTripType] = useState('One Way');

    return (
        <ImageBackground
            source={require('../../assets/CarRental.jpg')}
            style={styles.background}
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.gradientOverlay}
            />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'android' ? 'padding' : 'height'} 
                keyboardVerticalOffset={Platform.OS === 'android' ? 70 : 0} 
            >
                <ScrollView contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        {/* Main Section */}
                        <Text style={styles.headerText}>Let's</Text>
                        <Text style={styles.headerText}>Explore Car Rentals</Text>

                        {/* Input Fields */}
                        <View style={styles.inputGroup}>
                            <View style={styles.inputRow}>
                                <Ionicons name="location-outline" size={20} color="#fff" />
                                <TextInput style={styles.input} placeholder="PickUp Location" placeholderTextColor="#ccc" />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="location-outline" size={20} color="#fff" />
                                <TextInput style={styles.input} placeholder="DropOff Location" placeholderTextColor="#ccc" />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="calendar-outline" size={20} color="#fff" />
                                <TextInput style={styles.input} placeholder="PickUp date" placeholderTextColor="#ccc" />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="calendar-outline" size={20} color="#fff" />
                                <TextInput style={styles.input} placeholder="DropOff date" placeholderTextColor="#ccc" />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="time-outline" size={20} color="#fff" />
                                <TextInput style={styles.input} placeholder="Duration" placeholderTextColor="#ccc" />
                            </View>
                        </View>

                        {/* Search Button */}
                        <TouchableOpacity style={styles.searchButton} >
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer navigation={navigation} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    radioGroup: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    radioText: {
        marginLeft: 5,
        color: '#fff',
        fontSize: 16,
    },
    inputGroup: {
        marginVertical: 20,
        marginTop: 60,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        height: 50,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#ff6f00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HotelBooking;