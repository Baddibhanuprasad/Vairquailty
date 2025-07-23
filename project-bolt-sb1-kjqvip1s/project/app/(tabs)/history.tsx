import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { pollutionService } from '@/services/pollutionService';

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    loadWeeklyData();
  }, []);

  const loadWeeklyData = async () => {
    const data = await pollutionService.getWeeklyData();
    setWeeklyData(data);
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#4CAF50';
    if (aqi <= 100) return '#FFC107';
    if (aqi <= 150) return '#FF9800';
    if (aqi <= 200) return '#F44336';
    return '#9C27B0';
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  const maxAQI = Math.max(...weeklyData.map(item => item.aqi));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>7-Day History</Text>
        <Text style={styles.headerSubtitle}>Air quality trends in your area</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>AQI Trend</Text>
          <View style={styles.chartArea}>
            <View style={styles.yAxis}>
              <Text style={styles.axisLabel}>{maxAQI}</Text>
              <Text style={styles.axisLabel}>{Math.round(maxAQI * 0.75)}</Text>
              <Text style={styles.axisLabel}>{Math.round(maxAQI * 0.5)}</Text>
              <Text style={styles.axisLabel}>{Math.round(maxAQI * 0.25)}</Text>
              <Text style={styles.axisLabel}>0</Text>
            </View>
            <View style={styles.chart}>
              {weeklyData.map((item, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: (item.aqi / maxAQI) * 120,
                        backgroundColor: getAQIColor(item.aqi),
                      },
                    ]}
                  />
                  <Text style={styles.dayLabel}>{item.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Daily Details */}
        <View style={styles.dailyContainer}>
          <Text style={styles.sectionTitle}>Daily Details</Text>
          {weeklyData.map((item, index) => (
            <View key={index} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayName}>{item.dayFull}</Text>
                <Text style={styles.dayDate}>{item.date}</Text>
              </View>
              
              <View style={styles.dayContent}>
                <View style={styles.aqiSection}>
                  <View style={[styles.aqiIndicator, { backgroundColor: getAQIColor(item.aqi) }]}>
                    <Text style={styles.aqiText}>{item.aqi}</Text>
                  </View>
                  <Text style={styles.aqiStatusText}>{getAQIStatus(item.aqi)}</Text>
                </View>

                <View style={styles.pollutantsSection}>
                  <Text style={styles.pollutantsTitle}>Main Pollutants</Text>
                  <View style={styles.pollutantsList}>
                    <View style={styles.pollutantItem}>
                      <Text style={styles.pollutantName}>PM2.5</Text>
                      <Text style={styles.pollutantValue}>{item.pm25} μg/m³</Text>
                    </View>
                    <View style={styles.pollutantItem}>
                      <Text style={styles.pollutantName}>PM10</Text>
                      <Text style={styles.pollutantValue}>{item.pm10} μg/m³</Text>
                    </View>
                    <View style={styles.pollutantItem}>
                      <Text style={styles.pollutantName}>O3</Text>
                      <Text style={styles.pollutantValue}>{item.o3} μg/m³</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  chartArea: {
    flexDirection: 'row',
  },
  yAxis: {
    justifyContent: 'space-between',
    height: 140,
    marginRight: 10,
  },
  axisLabel: {
    fontSize: 12,
    color: '#666',
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  dailyContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dayCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dayDate: {
    fontSize: 14,
    color: '#666',
  },
  dayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aqiSection: {
    alignItems: 'center',
    flex: 1,
  },
  aqiIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  aqiText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aqiStatusText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  pollutantsSection: {
    flex: 2,
    marginLeft: 20,
  },
  pollutantsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pollutantsList: {
    gap: 5,
  },
  pollutantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pollutantName: {
    fontSize: 13,
    color: '#666',
  },
  pollutantValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
});