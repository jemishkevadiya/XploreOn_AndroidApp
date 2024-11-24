import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const HotelDetailsScreen = ({ navigation }) => {
    const hotelData = [
        {
            id: '1',
            name: 'Grand Palace Hotel',
            location: 'New York, USA',
            rating: '4.5',
            price: '$300/night',
            availableRooms: '5',
            image: require('../../assets/GrandPalaceHotel.jpg'), 
        },
        {
            id: '2',
            name: 'Skyline Resort',
            location: 'San Francisco, USA',
            rating: '4.2',
            price: '$250/night',
            availableRooms: '8',
            image: require('../../assets/SkylineResort.jpg'),
        },
        {
            id: '3',
            name: 'Oceanview Hotel',
            location: 'Miami, USA',
            rating: '4.8',
            price: '$400/night',
            availableRooms: '3',
            image: require('../../assets/OceanviewHotel.jpg'),
        },
        {
            id: '4',
            name: 'Mountain Escape Lodge',
            location: 'Denver, USA',
            rating: '4.7',
            price: '$350/night',
            availableRooms: '4',
            image: require('../../assets/MountainEscapeLodge.jpeg'),
        },
        {
            id: '5',
            name: 'Urban Retreat',
            location: 'Seattle, USA',
            rating: '4.3',
            price: '$270/night',
            availableRooms: '6',
            image: require('../../assets/UrbanRetreat.jpg'),
        },
        {
            id: '6',
            name: 'Luxury Stay Inn',
            location: 'Las Vegas, USA',
            rating: '4.9',
            price: '$500/night',
            availableRooms: '2',
            image: require('../../assets/LuxuryStayInn.jpg'),
        },
    ];

    const renderHotelCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.hotelImage} />
            <View style={styles.cardContent}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <Text style={styles.locationText}>Location: {item.location}</Text>
                <Text style={styles.ratingText}>Rating: {item.rating} ⭐</Text>
                <Text style={styles.availableText}>Available Rooms: {item.availableRooms}</Text>
                <Text style={styles.priceText}>Price: {item.price}</Text>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require('../../assets/hotel-BG.jpg')} 
            style={styles.background}
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.98)', 'transparent']}
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Hotel Details</Text>
                    </View>
                    <View>
                        {/* Hotel Cards */}
                        <FlatList
                            data={hotelData}
                            renderItem={renderHotelCard}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.cardList}
                            nestedScrollEnabled={true}
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
        height: 20,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
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
    cardList: {
        paddingBottom: 90,
        paddingHorizontal: 18,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'rgba(44, 44, 44, 0.98)',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,
        overflow: 'hidden',
    },
    hotelImage: {
        width: 120,
        height: 140,
    },
    cardContent: {
        flex: 1,
        padding: 15,
    },
    hotelName: {
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
    availableText: {
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

export default HotelDetailsScreen;
