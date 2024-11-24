import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentScreen = ({ route, navigation }) => {
    const { flightDetails } = route.params;

    return (
        <LinearGradient
            colors={['#ff6f00', '#ffa040']}
            style={styles.gradientBackground}
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>Payment Details</Text>

                {/* Flight Details */}
                <View style={styles.flightDetailsBox}>
                    <Text style={styles.label}>Airline: {flightDetails.airline}</Text>
                    <Text style={styles.label}>Route: {flightDetails.origin} → {flightDetails.destination}</Text>
                    <Text style={styles.label}>Duration: {flightDetails.duration}</Text>
                    <Text style={styles.label}>Date: {flightDetails.date}</Text>
                    <Text style={styles.label}>Time: {flightDetails.time}</Text>
                    <Text style={styles.label}>Price: {flightDetails.price}</Text>
                </View>

                {/* Payment Options */}
                <View style={styles.paymentOptionsBox}>
                    <Text style={styles.paymentTitle}>Payment Options</Text>
                    <TouchableOpacity style={styles.paymentOption}>
                        <Text style={styles.paymentText}>Credit/Debit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOption}>
                        <Text style={styles.paymentText}>UPI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOption}>
                        <Text style={styles.paymentText}>Net Banking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOption}>
                        <Text style={styles.paymentText}>Wallet</Text>
                    </TouchableOpacity>
                </View>

                {/* Pay Now Button */}
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => alert("Payment Successful!")}
                >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        padding: 20,
        paddingBottom: 50,
    },
    backArrow: {
        marginTop: 20,
        marginBottom: 20,
    },
    backText: {
        fontSize: 16,
        color: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    flightDetailsBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    paymentOptionsBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    paymentOption: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    paymentText: {
        fontSize: 16,
        color: '#fff',
    },
    payButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6f00',
    },
});

export default PaymentScreen;
