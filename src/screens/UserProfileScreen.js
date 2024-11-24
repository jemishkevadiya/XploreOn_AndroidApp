import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const UserProfileScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#333333', '#fad0c4']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <Text style={styles.headerText}>User Profile Management</Text>

        {/* Profile Form */}
        <View style={styles.profileForm}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#fff" />
            <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#ccc" />
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 90,
    paddingHorizontal: 20,
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileForm: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#ff6f00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;