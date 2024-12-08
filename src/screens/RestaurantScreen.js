import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, 
  ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';
import { searchLocation } from '../utils/api';
import { Alert } from 'react-native'; 

const RestaurantBooking = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [person, setPerson] = useState('');

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
  
    return inputDate >= today;
  };
  
  
  const handleSearch = async () => {
    try {
      if (!location || !reservationDate || !person) {
        Alert.alert('Error', 'All fields are required!');
        return;
      }

      if (!isFutureDate(reservationDate)) {
        Alert.alert('Error', 'Please select a current or future date for your reservation.');
        return;
      }

      console.log('Date is valid, proceeding with search...');
      const locationId = await searchLocation(location); 
      navigation.navigate('RestaurantDetailsScreen', { locationId, reservationDate, person });
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/restaurant-BG.jpg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradientOverlay}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 70 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.headerText}>{"Let's"}</Text>
            <Text style={styles.headerText}>{"Explore Restaurants"}</Text>

            {/* Input Fields */}
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  placeholderTextColor="#ccc"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Reservation date"
                  placeholderTextColor="#ccc"
                  value={reservationDate}
                  onChangeText={setReservationDate}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="people-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Person"
                  placeholderTextColor="#ccc"
                  value={person}
                  onChangeText={setPerson}
                />
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>{"Search"}</Text>
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
  backgroundImage: {
    opacity: 0.80,
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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

export default RestaurantBooking;