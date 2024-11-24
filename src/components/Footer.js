import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('ServicesScreen')}>
        <Ionicons name="home-outline" size={30} color="#ffffff" />
      </TouchableOpacity>

      {/* History Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Ionicons name="time-outline" size={30} color="#ffffff" />
      </TouchableOpacity>

      {/* Notifications Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Ionicons name="notifications-outline" size={30} color="#ffffff" />
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: '#444444',
    paddingVertical: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Subtle border on top
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Footer;
