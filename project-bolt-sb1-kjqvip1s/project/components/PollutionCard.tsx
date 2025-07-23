import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PollutionCardProps {
  data: {
    aqi: number;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
    temperature: number;
    humidity: number;
    pressure: number;
  };
}

export function PollutionCard({ data }: PollutionCardProps) {
  const pollutants = [
    { name: 'PM2.5', value: data.pm25, unit: 'μg/m³', icon: 'partly-sunny' },
    { name: 'PM10', value: data.pm10, unit: 'μg/m³', icon: 'cloudy' },
    { name: 'O3', value: data.o3, unit: 'μg/m³', icon: 'sunny' },
    { name: 'NO2', value: data.no2, unit: 'μg/m³', icon: 'car' },
    { name: 'SO2', value: data.so2, unit: 'μg/m³', icon: 'business' },
    { name: 'CO', value: data.co, unit: 'μg/m³', icon: 'flame' },
  ];

  const weatherData = [
    { name: 'Temperature', value: data.temperature, unit: '°C', icon: 'thermometer' },
    { name: 'Humidity', value: data.humidity, unit: '%', icon: 'water' },
    { name: 'Pressure', value: data.pressure, unit: 'hPa', icon: 'speedometer' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detailed Air Quality</Text>
      
      {/* Pollutants Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pollutants</Text>
        <View style={styles.grid}>
          {pollutants.map((pollutant, index) => (
            <View key={index} style={styles.pollutantCard}>
              <Ionicons 
                name={pollutant.icon as any} 
                size={20} 
                color="#4CAF50" 
                style={styles.pollutantIcon}
              />
              <Text style={styles.pollutantName}>{pollutant.name}</Text>
              <Text style={styles.pollutantValue}>
                {pollutant.value} {pollutant.unit}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Weather Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weather Conditions</Text>
        <View style={styles.weatherGrid}>
          {weatherData.map((weather, index) => (
            <View key={index} style={styles.weatherCard}>
              <Ionicons 
                name={weather.icon as any} 
                size={24} 
                color="#2196F3" 
                style={styles.weatherIcon}
              />
              <Text style={styles.weatherName}>{weather.name}</Text>
              <Text style={styles.weatherValue}>
                {weather.value}{weather.unit}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pollutantCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: '30%',
    minWidth: 90,
  },
  pollutantIcon: {
    marginBottom: 5,
  },
  pollutantName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  pollutantValue: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherCard: {
    alignItems: 'center',
    flex: 1,
  },
  weatherIcon: {
    marginBottom: 8,
  },
  weatherName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  weatherValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});