import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';

const BookingHistoryScreen = ({ navigation }) => {
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const loadBookingHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('bookingHistory');
        if (history) {
          setBookingHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading booking history:', error);
      }
    };

    loadBookingHistory();
  }, []);

  return (
    <LinearGradient colors={['#333333', '#fad0c4']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}>Booking History</Text>

        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{booking.name} Booking</Text>
                       
              </View>
              <Text style={styles.cardDetails}>{booking.location}</Text>
              <Text style={styles.cardPrice}>Price: ${booking.price}</Text>
              <Text style={styles.cardDate}>checkin: {booking.checkin}</Text>
              <Text style={styles.cardDate}>Checkout: {booking.checkout}</Text>  
            </View>
          ))
        ) : (
          <Text style={styles.noBookingsText}>No booking history available</Text>
        )}
      </ScrollView>

      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 90,
    paddingHorizontal: 20,
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  bookingCard: {
    backgroundColor: 'rgba(44, 44, 44, 0.98)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDate: {
    fontSize: 14,
    color: '#ccc',
  },
  cardDetails: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
});
export default BookingHistoryScreen;
