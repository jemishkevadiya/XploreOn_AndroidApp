import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const PaymentScreen = ({ navigation, route }) => {
  const { selectedService, serviceType } = route.params;

 
  const renderServiceDetails = () => {
    if (serviceType === 'flight') {
      return (
        <View style={styles.serviceDetailsContainer}>
          <Text style={styles.sectionTitle}>{selectedService?.airline || 'Flight Details'}</Text>
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceText}>Route: {selectedService?.origin} ➝ {selectedService?.destination}</Text>
            <Text style={styles.serviceText}>Duration: {selectedService?.duration}</Text>
            <Text style={styles.serviceText}>Time: {selectedService?.time}</Text>
            <Text style={styles.serviceText}>Price: {selectedService?.price}</Text>
          </View>
        </View>
      );
    } else if (serviceType === 'hotel') {
      return (
        <View style={styles.serviceDetailsContainer}>
        <Text style={styles.sectionTitle}>{selectedService?.name || 'Hotel Details'}</Text>
        <View style={styles.serviceDetails}>
          <Text style={styles.serviceText}>Location: {selectedService?.location || 'Unknown'}</Text>
          <Text style={styles.serviceText}>Check-In: {selectedService?.checkin || 'N/A'}</Text>
          <Text style={styles.serviceText}>Check-Out: {selectedService?.checkout || 'N/A'}</Text>
          <Text style={styles.serviceText}>Price: ${selectedService?.price || 'N/A'}</Text>
          <Text style={styles.serviceText}>Rating: {selectedService?.rating || 'N/A'} ⭐</Text>
        </View>
      </View>
      );
    } else if (serviceType === 'car') {
      return (
        <View style={styles.serviceDetailsContainer}>
          <Text style={styles.sectionTitle}>{selectedService?.company || 'Car Rental Details'}</Text>
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceText}>Car Model: {selectedService?.vehicleName || 'Unknown'}</Text>
            <Text style={styles.serviceText}>Location: {selectedService?.location || 'N/A'}</Text>
            <Text style={styles.serviceText}>Price: {selectedService?.price || 'N/A'}</Text>
            <Text style={styles.serviceText}>Supplier: {selectedService?.supplier}</Text>
          </View>
        </View>
      );
    } else if (serviceType === 'restaurant') {
      return (
        <View style={styles.serviceDetailsContainer}>
          <Text style={styles.sectionTitle}>{selectedService?.name || 'Restaurant Details'}</Text>
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceText}>Location: {selectedService?.name || 'Unknown'}</Text>
            <Text style={styles.serviceText}>Reservation Date: {selectedService?.date || 'N/A'}</Text>
            <Text style={styles.serviceText}>Type: {selectedService?.type}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

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
        <Text style={styles.headerText}>Payment Details</Text>

        {/* Dynamic Service Details */}
        {renderServiceDetails()}

        {/* Payment Form */}
        <View style={styles.paymentForm}>
          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Cardholder Name" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" placeholderTextColor="#ccc" />
          </View>
          <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('ThankYouScreen')}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
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
  serviceDetailsContainer: {
    backgroundColor: 'rgba(44, 44, 44, 0.98)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  serviceDetails: {
    marginTop: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  paymentForm: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  payButton: {
    backgroundColor: '#ff6f00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
