import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const FlightDetailsScreen = ({ navigation }) => {
    const flightData = [
        {
            id: '1',
            airline: 'Fly Emirates',
            origin: 'NYC',
            destination: 'SFO',
            originCity: 'New York',
            destinationCity: 'San Francisco',
            duration: '2h 40m',
            date: '24 June',
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
            date: '24 June',
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
            date: '24 June',
            time: '10:30 PM',
            price: '$520',
        },
        {
            id: '4',
            airline: 'Turkish Airlines',
            origin: 'NYC',
            destination: 'SFO',
            duration: '2h 55m',
            date: '24 June',
            returnDate: '30 June',
            time: '10:30 PM',
            price: '$600',
            tripType: 'Round Trip',
        },
        {
            id: '5',
            airline: 'Delta Airlines',
            origin: 'NYC',
            destination: 'SFO',
            duration: '3h 10m',
            date: '24 June',
            returnDate: '30 June',
            time: '11:00 AM',
            price: '$580',
            tripType: 'Round Trip',
        },
        {
            id: '6',
            airline: 'United Airlines',
            origin: 'NYC',
            destination: 'SFO',
            duration: '3h 20m',
            date: '24 June',
            returnDate: '30 June',
            time: '12:30 PM',
            price: '$620',
            tripType: 'Round Trip',
        },
      
    ];

    const renderFlightCard = ({ item }) => (
        <View style={styles.card}>
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
        <ImageBackground
      source={require('../../assets/flight-bg.jpg')} 
      style={styles.background}
    >
        <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradientOverlay}
      />
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.backArrow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.topSpace} />
                <View style={styles.routeContainer}> 
                    {/* Route Info */}
                    <View style={styles.routeInfo}>
                        <View style={styles.routeDetails}>
                            <Text style={styles.routeCode}>NYC</Text>
                            <Text style={styles.cityText}>New York</Text>
                        </View>
                        <View style={styles.routeArrow}>
                            <Ionicons name="airplane" size={24} color="#ff6f00" />
                        </View>
                        <View style={styles.routeDetails}>
                            <Text style={styles.routeCode}>SFO</Text>
                            <Text style={styles.cityText}>San Francisco</Text>
                        </View>
                    </View>
                </View>
                <View>
                    {/* Flight Cards */}
                    <FlatList
                        data={flightData}
                        renderItem={renderFlightCard}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.cardList}
                    />
                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
            </ImageBackground>  
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
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
    topSpace: {
        height: 50,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
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
    editText: {
        fontSize: 12,
        color: '#ff6f00',
        marginTop: 5,
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
});

export default FlightDetailsScreen;
