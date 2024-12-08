import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const FlightDetailsScreen = ({ navigation, route }) => {
  const { searchResults } = route.params || {};

  if (!searchResults || !searchResults?.data?.flightOffers) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No flight details available.</Text>
        <Text style={styles.noResultsHint}>
          Please go back and select a flight to view its details.
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const flights = searchResults.data.flightOffers;

  if (flights.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No flights found for the selected route.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const firstFlight = flights[0];
  const departureCityName = firstFlight?.segments?.[0]?.departureAirport?.cityName || 'Unknown';
  const destinationCityName = firstFlight?.segments?.[0]?.arrivalAirport?.cityName || 'Unknown';

  const convertDuration = (totalSeconds) => {
    if (!totalSeconds || totalSeconds < 0) {
      return '0.00h'; // Handle invalid or missing data
    }
    
    const totalHours = (totalSeconds / 3600).toFixed(2); // Convert minutes to hours and round to 2 decimal places
    return `${totalHours}h`;
    
  };
  
  return (
    <ImageBackground
      source={require('../../assets/flight-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.background}>
        <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.gradientOverlay} />
        <View style={styles.container}>
          <View style={styles.backArrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Top Section with City Names */}
            <View style={styles.routeContainer}>
              <View style={styles.routeInfo}>
                <View style={styles.routeDetails}>
                  <Text style={styles.routeCode}>{departureCityName}</Text>
                  <Text style={styles.cityText}>Origin</Text>
                </View>
                <View style={styles.routeArrow}>
                  <Ionicons name="airplane" size={24} color="#ff6f00" />
                </View>
                <View style={styles.routeDetails}>
                  <Text style={styles.routeCode}>{destinationCityName}</Text>
                  <Text style={styles.cityText}>Destination</Text>
                </View>
              </View>
            </View>

            {/* Flight Cards */}
            <View style={styles.cardList}>
              {flights.map((flight, index) => {
                const segment = flight?.segments?.[0];
                const leg = segment?.legs?.[0];
                const carrierData = leg?.carriersData?.[0];

                const airlineName = carrierData?.name || 'Unknown Airline';
                const airlineLogo = carrierData?.logo || null;
                const departureCity = segment?.departureAirport?.city || 'Unknown';
                const arrivalCity = segment?.arrivalAirport?.city || 'Unknown';
                const departureTime = leg?.departureTime || 'N/A';
                const arrivalTime = leg?.arrivalTime || 'N/A';
                const duration = convertDuration(leg?.totalTime || 0);
                const price = `${flight.priceBreakdown?.total?.currencyCode} ${flight.priceBreakdown?.total?.units}`;

                return (
                  <View style={styles.card} key={index}>
                    <View style={styles.cardHeader}>
                      {airlineLogo ? (
                        <Image source={{ uri: airlineLogo }} style={styles.airlineLogo} />
                      ) : (
                        <Ionicons name="airplane-outline" size={40} color="#fff" />
                      )}
                      <Text style={styles.airlineName}>{airlineName}</Text>
                    </View>
                    <View style={styles.cardBody}>
                      <View style={styles.flightInfo}>
                        <Text style={styles.locationCode}>{departureCity}</Text>
                        <View style={styles.iconContainer}>
                          <Ionicons name="airplane-outline" size={16} color="#fff" />
                          <Text style={styles.flightDuration}>{duration}</Text>
                        </View>
                        <Text style={styles.locationCode}>{arrivalCity}</Text>
                      </View>
                      <View style={styles.flightDetails}>
                        <View style={styles.timeDetails}>
                          <Text style={styles.flightText}>Departure: {departureTime}</Text>
                          <Text style={styles.flightText}>Arrival: {arrivalTime}</Text>
                        </View>
                        <Text style={styles.priceText}>Price: {price}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <Footer navigation={navigation} />
        </View>
      </View>
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
  container: {
    flex: 1,
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  routeContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 18,
  },
  routeDetails: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  routeCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cityText: {
    fontSize: 14,
    color: '#ccc',
  },
  routeArrow: {
    alignItems: 'center',
  },
  cardList: {
    paddingBottom: 90,
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: 'rgba(44, 44, 44, 0.98)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    paddingHorizontal: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  airlineLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  flightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  flightDuration: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 7,
    marginBottom: 10,
    textAlign: 'center',
  },
  flightText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  iconContainer: {
    marginLeft: 25
  },
  priceText: {
    fontSize: 17,
    marginLeft: 220,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#fff',
  },
  retryButton: {
    backgroundColor: '#ff6f00',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FlightDetailsScreen;
