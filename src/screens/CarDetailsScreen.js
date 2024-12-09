import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer'; 

const CarDetailsScreen = ({ route, navigation }) => {

  const { carData } = route.params; 


  if (!carData || carData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorMessage}>No car data available</Text>
      </View>
    );
  }

  
  const renderCarCard = ({ item }) => {
  
    
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('PaymentScreen', { selectedCar: item, serviceType: 'car' })}
      >
        <Image source={{ uri: item.image_url }} style={styles.carImage} />
        <View style={styles.cardContent}>
          <Text style={styles.carName}>{item.vehicle_name}</Text>
          <Text style={styles.locationText}>Location: {item.location}</Text>
          <Text style={styles.doorText}>Doors: {item.doors}</Text>
          <Text style={styles.transmissionText}>transmission: {item.transmission}</Text>
          <Text style={styles.priceText}>Price: {item.price}</Text>
          <Text style={styles.supplierText}>supplier: {item.supplier} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={require('../../assets/CarRental.jpg')} 
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient colors={['rgba(0,0,0,0.98)', 'transparent']} style={styles.gradientOverlay} />

      <View style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Car Details</Text>
        </View>

        {/* Car Cards */}
        <FlatList
          data={carData}  
          renderItem={renderCarCard}
        />
      </View>

      {/* Footer */}
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
    opacity: 0.75,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 90,
    paddingTop: 30,
  },
  backArrow: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(44, 44, 44, 0.98)',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    overflow: 'hidden',
    marginHorizontal: 18,
  },
  carImage: {
    width: 120,
    height: 140,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  supplierText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  doorText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  transmissionText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: '#ff0000',
  },
});

export default CarDetailsScreen;

