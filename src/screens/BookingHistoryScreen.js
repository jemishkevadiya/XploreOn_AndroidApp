import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const BookingHistoryScreen = ({ navigation }) => {
  const bookingHistory = [
    {
      id: '1',
      type: 'Flight',
      details: 'NYC to SFO with Fly Emirates',
      date: '24 Nov, 2024',
      price: '$540',
    },
    {
      id: '2',
      type: 'Hotel',
      details: 'Stay at Grand Hotel, San Francisco',
      date: '20 Nov, 2024',
      price: '$1200',
    },
    {
      id: '3',
      type: 'Car Rental',
      details: 'Toyota Camry from Hertz',
      date: '18 Nov, 2024',
      price: '$250',
    },
    {
      id: '4',
      type: 'Restaurant',
      details: 'Dinner at Le Bernardin',
      date: '15 Nov, 2024',
      price: '$300',
    },
    {
      id: '5',
      type: 'Flight',
      details: 'NYC to LAX with Delta Airlines',
      date: '12 Nov, 2024',
      price: '$450',
    },
    {
      id: '6',
      type: 'Hotel',
      details: 'Stay at The Ritz, Los Angeles',
      date: '10 Nov, 2024',
      price: '$1500',
    },
  ];

  return (
    <LinearGradient colors={['#333333', '#fad0c4']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <Text style={styles.headerText}>Booking History</Text>

        {/* Booking History Cards */}
        {bookingHistory.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{booking.type} Booking</Text>
              <Text style={styles.cardDate}>{booking.date}</Text>
            </View>
            <Text style={styles.cardDetails}>{booking.details}</Text>
            <Text style={styles.cardPrice}>Price: {booking.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
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