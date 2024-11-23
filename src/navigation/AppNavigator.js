import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';

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
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }} />


                {/* Individual Service Screens */}

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
