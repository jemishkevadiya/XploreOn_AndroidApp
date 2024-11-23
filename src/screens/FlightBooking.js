import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView,
   ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const FlightScreen = ({ navigation }) => {

  const [tripType, setTripType] = useState('One Way');

  return (
    <ImageBackground
      source={require('../../assets/flight-bg.jpg')} // Replace with your background image path
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']} // Gradient overlay
        style={styles.gradientOverlay}
      />
       <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Padding works for both iOS and Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0} // Adjust offset for fixed header
      >
      <ScrollView contentContainerStyle={styles.scrollContent}
       showsVerticalScrollIndicator={false}
       keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Header Section */}
          <Text style={styles.headerText}>Let's</Text>
          <Text style={styles.headerText}>Explore</Text>

          {/* Travel Options */}
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setTripType('One Way')}
            >
              <Ionicons
                name={tripType === 'One Way' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={tripType === 'One Way' ? '#ff6f00' : '#fff'}
              />
              <Text style={styles.radioText}>One Way</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setTripType('Round Trip')}
            >
              <Ionicons
                name={tripType === 'Round Trip' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={tripType === 'Round Trip' ? '#ff6f00' : '#fff'}
              />
              <Text style={styles.radioText}>Round Trip</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.inputGroup}>
            <View style={styles.inputRow}>
              <Ionicons name="airplane-outline" size={20} color="#fff" />
              <TextInput style={styles.input} placeholder="From" placeholderTextColor="#ccc" />
            </View>
            <View style={styles.inputRow}>
              <Ionicons name="location-outline" size={20} color="#fff" />
              <TextInput style={styles.input} placeholder="To" placeholderTextColor="#ccc" />
            </View>
            <View style={styles.inputRow}>
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <TextInput style={styles.input} placeholder="Departure" placeholderTextColor="#ccc" />
            </View>
            {/* Return input when user selected round-trip */}
            {tripType === 'Round Trip' && (
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <TextInput style={styles.input} placeholder="Return" placeholderTextColor="#ccc" />
              </View>
            )}
            <View style={styles.inputRow}>
              <Ionicons name="briefcase-outline" size={20} color="#fff" />
              <TextInput style={styles.input} placeholder="Class" placeholderTextColor="#ccc" />
            </View>
            <View style={styles.inputRow}>
              <Ionicons name="people-outline" size={20} color="#fff" />
              <TextInput style={styles.input} placeholder="Passenger" placeholderTextColor="#ccc" />
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton}>
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
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

export default FlightScreen;
