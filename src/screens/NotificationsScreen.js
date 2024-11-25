import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    { id: '1', title: 'Booking Confirmed', message: 'Your flight booking has been confirmed.', date: '24 Nov, 2024' },
    { id: '2', title: 'Payment Successful', message: 'Your payment for the hotel was successful.', date: '23 Nov, 2024' },
    { id: '3', title: 'Reminder', message: 'Your car rental is scheduled for tomorrow.', date: '22 Nov, 2024' },
    { id: '4', title: 'Restaurant Reserved', message: 'Your table at XYZ Restaurant has been reserved.', date: '21 Nov, 2024' },
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
        <Text style={styles.headerText}>Notifications</Text>

        {/* Notification Cards */}
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardDate}>{notification.date}</Text>
            </View>
            <Text style={styles.cardMessage}>{notification.message}</Text>
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
  notificationCard: {
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
  cardMessage: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default NotificationsScreen;