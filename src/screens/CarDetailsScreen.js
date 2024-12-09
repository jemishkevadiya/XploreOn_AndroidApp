import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const CarDetailsScreen = ({ navigation }) => {
  const carData = [
    {
      id: '1',
      name: 'Tesla Model S',
      location: 'Los Angeles, USA',
      rating: '4.9',
      price: '$200/day',
      availability: 'Available',
      image: require('../../assets/tesla.jpg'),
    },
    {
      id: '2',
      name: 'Ford Mustang',
      location: 'Miami, USA',
      rating: '4.7',
      price: '$150/day',
      availability: 'Limited',
      image: require('../../assets/ford-mustang.jpg'),
    },
    {
      id: '3',
      name: 'BMW X7',
      location: 'New York, USA',
      rating: '4.8',
      price: '$180/day',
      availability: 'Available',
      image: require('../../assets/bmw-x7.jpg'),
    },
    {
      id: '4',
      name: 'Chevrolet Camaro',
      location: 'San Francisco, USA',
      rating: '4.6',
      price: '$170/day',
      availability: 'Limited',
      image: require('../../assets/chevrolet-camaro.jpg'),
    },
    {
      id: '5',
      name: 'Audi Q8',
      location: 'Seattle, USA',
      rating: '4.8',
      price: '$190/day',
      availability: 'Available',
      image: require('../../assets/audi-q8.jpg'),
    },
    {
      id: '6',
      name: 'Range Rover Evoque',
      location: 'Las Vegas, USA',
      rating: '4.9',
      price: '$220/day',
      availability: 'Available',
      image: require('../../assets/rangerover-evoque.jpg'),
    },
  ];

  const renderCarCard = (item) => (
    <TouchableOpacity style={styles.card} key={item.id} onPress={() => navigation.navigate('PaymentScreen', 
      { selectedHotel: item, serviceType: 'car'})}>
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.locationText}>Location: {item.location}</Text>
        <Text style={styles.ratingText}>Rating: {item.rating} ⭐</Text>
        <Text style={styles.availabilityText}>Availability: {item.availability}</Text>
        <Text style={styles.priceText}>Price: {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../../assets/CarRental.jpg')} style={styles.background}
    imageStyle={styles.backgroundImage}>
      <LinearGradient colors={['rgba(0,0,0,0.98)', 'transparent']} style={styles.gradientOverlay} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        {carData.map(renderCarCard)}


      </ScrollView>
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
    flexGrow: 1,
    paddingBottom: 90,
  },
  backArrow: {
    marginTop: 70,
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
  ratingText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  availabilityText: {
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
});

export default CarDetailsScreen;