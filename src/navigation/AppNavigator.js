import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen.js';
import SignUpScreen from '../screens/SignUpScreen';
import ServicesScreen from '../screens/ServicesScreen';
import FlightBooking from '../screens/FlightBooking.js';
import FlightDetailsScreen from '../screens/FlightDetailsScreen.js';
import HotelBooking from '../screens/HotelBooking.js';
import HotelDetailsScreen from '../screens/HotelDetailsScreen.js';
import CarRentalsScreen from '../screens/CarRentalsScreen.js';
import CarDetailsScreen from '../screens/CarDetailsScreen.js';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
      screenOptions={{
                        headerBackImage: () => (
                            <Ionicons name="arrow-back" size={25} color="#fff" style={{ marginLeft: 10 }} />
                        ),
                        headerBackTitleVisible: false, // Hides the "Back" text
                        headerStyle: {
                            backgroundColor: '#ff6f00', // Header background color
                        },
                        headerTintColor: '#fff', // Color for icons and text
                    }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="FlightBooking" component={FlightBooking} options={{ headerShown: false }}/>
        <Stack.Screen name="FlightDetailsScreen" component={FlightDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HotelBooking" component={HotelBooking} options={{ headerShown: false }}/>
        <Stack.Screen name="HotelDetailsScreen" component={HotelDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CarRentalsScreen" component={CarRentalsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
