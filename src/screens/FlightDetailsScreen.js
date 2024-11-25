import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const FlightDetailsScreen = ({ navigation, route }) => {
  const { origin, destination, departureDate, returnDate, passengers, travelClass } = route.params;

  const flightData = [
    {
      id: '1',
      airline: 'Fly Emirates',
      origin: 'NYC',
      destination: 'SFO',
      originCity: 'New York',
      destinationCity: 'San Francisco',
      duration: '2h 40m',
      date: '2024-12-01',
      time: '10:30 PM',
      price: '$540',
    },
    {
      id: '2',
      airline: 'Air Canada',
      origin: 'NYC',
      destination: 'SFO',
      originCity: 'New York',
      destinationCity: 'San Francisco',
      duration: '3h 30m',
      date: '2024-12-13',
      time: '10:30 PM',
      price: '$490',
    },
    {
      id: '3',
      airline: 'Turkish Airlines',
      origin: 'NYC',
      destination: 'SFO',
      originCity: 'New York',
      destinationCity: 'San Francisco',
      duration: '2h 55m',
      date: '2024-12-28',
      time: '10:30 PM',
      price: '$520',
    },
    {
      id: '4',
      airline: 'Delta Airlines',
      origin: 'NYC',
      destination: 'SFO',
      originCity: 'New York',
      destinationCity: 'San Francisco',
      duration: '3h 10m',
      date: '2024-12-25',
      returnDate: '2024-12-30',
      time: '11:00 AM',
      price: '$580',
    },
    {
      id: '5',
      airline: 'United Airlines',
      origin: 'NYC',
      destination: 'SFO',
      originCity: 'New York',
      destinationCity: 'San Francisco',
      duration: '3h 20m',
      date: '2024-12-15',
      returnDate: '2024-12-20',
      time: '12:30 PM',
      price: '$620',
    },
    {
      id: '6',
      airline: 'Lufthansa',
      origin: 'NYC',
      destination: 'SFO',
      duration: '2h 45m',
      originCity: 'New York',
      destinationCity: 'San Francisco',
      date: '2024-12-19',
      returnDate: '2024-12-01',
      time: '1:00 PM',
      price: '$500',
    },
  
  ];

  const filteredFlights = flightData.filter((flight) => {
    const isOriginMatch = flight.origin.toLowerCase() === origin.toLowerCase();
    const isDestinationMatch = flight.destination.toLowerCase() === destination.toLowerCase();
    const isDepartureMatch = flight.date === departureDate;
    const isReturnMatch = returnDate ? flight.returnDate === returnDate : true; 

    return isOriginMatch && isDestinationMatch && isDepartureMatch && isReturnMatch;
  });

  const renderFlightCard = (item) => (
    <View style={styles.card} key={item.id}>
      <View style={styles.cardHeader}>
        <Text style={styles.airlineName}>{item.airline}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.flightInfo}>
          <Text style={styles.locationCode}>{item.origin}</Text>
          <Ionicons name="airplane-outline" size={16} color="#fff" />
          <Text style={styles.locationCode}>{item.destination}</Text>
        </View>
        <Text style={styles.flightDuration}>{item.duration}</Text>
        <View style={styles.flightDetails}>
          <Text style={styles.flightText}>Date: {item.date}</Text>
          <Text style={styles.flightText}>Time: {item.time}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.priceText}>Price: {item.price}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../../assets/flight-bg.jpg')} style={styles.background}>
      <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.gradientOverlay} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.routeContainer}>
          <Text style={styles.routeText}>
            Flights from <Text style={styles.highlight}>{origin}</Text> to{' '}
            <Text style={styles.highlight}>{destination}</Text>
          </Text>
        </View>

       
        {filteredFlights.length > 0 ? (
          filteredFlights.map(renderFlightCard)
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No flights found for the selected criteria.</Text>
          </View>
        )}
      </ScrollView>

    
      <Footer navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 90,
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
    marginBottom: 20,
  },
  routeContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  routeText: {
    fontSize: 18,
    color: '#fff',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  card: {
    backgroundColor: 'rgba(44, 44, 44, 0.98)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginBottom: 10,
  },
  flightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  locationCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  flightDuration: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flightText: {
    fontSize: 14,
    color: '#ccc',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  noResults: {
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default FlightDetailsScreen;