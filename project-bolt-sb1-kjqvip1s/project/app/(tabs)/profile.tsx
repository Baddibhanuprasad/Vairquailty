import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace('/');
          },
        },
      ]
    );
  };

  const settingsOptions = [
    {
      title: 'Notifications',
      subtitle: 'Air quality alerts and updates',
      icon: 'notifications',
      action: () => Alert.alert('Notifications', 'Notification settings coming soon!'),
    },
    {
      title: 'Location Services',
      subtitle: 'Manage location permissions',
      icon: 'location',
      action: () => Alert.alert('Location', 'Location settings coming soon!'),
    },
    {
      title: 'Health Preferences',
      subtitle: 'Set your health conditions',
      icon: 'medical',
      action: () => Alert.alert('Health', 'Health preferences coming soon!'),
    },
    {
      title: 'Data & Privacy',
      subtitle: 'Manage your data preferences',
      icon: 'shield-checkmark',
      action: () => Alert.alert('Privacy', 'Privacy settings coming soon!'),
    },
    {
      title: 'About',
      subtitle: 'App version and information',
      icon: 'information-circle',
      action: () => Alert.alert('About AirGuard', 'Version 1.0.0\n\nYour trusted air quality companion.'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info Section */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#4CAF50" />
          </View>
          <Text style={styles.userName}>{userEmail}</Text>
          <Text style={styles.userStatus}>Premium Member</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="eye" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Locations Checked</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={24} color="#2196F3" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="leaf" size={24} color="#FF9800" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Clean Air Days</Text>
          </View>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={option.action}
            >
              <View style={styles.settingIcon}>
                <Ionicons name={option.icon as any} size={22} color="#4CAF50" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{option.title}</Text>
                <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  userSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  settingsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});