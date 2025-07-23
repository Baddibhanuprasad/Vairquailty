import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { PollutionCard } from '@/components/PollutionCard';
import { SuggestionCard } from '@/components/SuggestionCard';
import { pollutionService } from '@/services/pollutionService';

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [pollutionData, setPollutionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to check air quality in your area.'
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      const pollution = await pollutionService.getPollutionData(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      setPollutionData(pollution);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location or pollution data');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getCurrentLocation();
    setRefreshing(false);
  };

  const getPollutionColor = (aqi: number) => {
    if (aqi <= 50) return ['#4CAF50', '#66BB6A'];
    if (aqi <= 100) return ['#FFC107', '#FFD54F'];
    if (aqi <= 150) return ['#FF9800', '#FFB74D'];
    if (aqi <= 200) return ['#F44336', '#EF5350'];
    return ['#9C27B0', '#BA68C8'];
  };

  const getPollutionStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={pollutionData ? getPollutionColor(pollutionData.aqi) : ['#4CAF50', '#66BB6A']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Air Quality</Text>
          <Text style={styles.headerSubtitle}>Your Current Location</Text>
          
          {pollutionData && (
            <View style={styles.aqiContainer}>
              <Text style={styles.aqiValue}>{pollutionData.aqi}</Text>
              <Text style={styles.aqiLabel}>AQI</Text>
              <Text style={styles.aqiStatus}>
                {getPollutionStatus(pollutionData.aqi)}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.refreshButton} onPress={getCurrentLocation}>
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.refreshText}>Update Location</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {pollutionData && (
          <>
            <PollutionCard data={pollutionData} />
            
            {pollutionData.aqi > 50 && (
              <SuggestionCard aqi={pollutionData.aqi} />
            )}
          </>
        )}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  aqiContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  aqiValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
  },
  aqiLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: -5,
  },
  aqiStatus: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 5,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  refreshText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});