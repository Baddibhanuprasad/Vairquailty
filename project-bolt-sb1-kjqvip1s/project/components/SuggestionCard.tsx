import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SuggestionCardProps {
  aqi: number;
}

export function SuggestionCard({ aqi }: SuggestionCardProps) {
  const getSuggestions = (aqi: number) => {
    if (aqi <= 50) {
      return {
        medical: [
          'Air quality is satisfactory',
          'Ideal for outdoor activities',
          'No health precautions needed',
        ],
        avoidance: [
          'Perfect time for jogging or cycling',
          'Open windows for fresh air',
          'Enjoy outdoor sports',
        ],
        color: '#4CAF50',
        level: 'Good',
      };
    } else if (aqi <= 100) {
      return {
        medical: [
          'Sensitive individuals may experience minor irritation',
          'People with respiratory conditions should monitor symptoms',
          'Consider reducing prolonged outdoor exertion',
        ],
        avoidance: [
          'Limit intense outdoor activities during peak hours',
          'Keep windows closed during high traffic times',
          'Use air purifiers indoors if available',
        ],
        color: '#FFC107',
        level: 'Moderate',
      };
    } else if (aqi <= 150) {
      return {
        medical: [
          'People with heart/lung disease, elderly, and children should avoid prolonged outdoor exertion',
          'Everyone may experience mild symptoms',
          'Consider wearing N95 masks outdoors',
          'Keep rescue inhalers handy if you have asthma',
        ],
        avoidance: [
          'Avoid outdoor activities during peak pollution hours',
          'Keep windows and doors closed',
          'Use air purifiers with HEPA filters',
          'Avoid heavily trafficked areas',
        ],
        color: '#FF9800',
        level: 'Unhealthy for Sensitive Groups',
      };
    } else if (aqi <= 200) {
      return {
        medical: [
          'Everyone should avoid prolonged outdoor exertion',
          'People with heart/lung disease should avoid outdoor activities',
          'Wear N95 or P100 masks when going outside',
          'Seek medical attention if experiencing breathing difficulties',
        ],
        avoidance: [
          'Stay indoors as much as possible',
          'Seal gaps around doors and windows',
          'Use air purifiers on high settings',
          'Avoid driving with windows down',
          'Cancel outdoor events and activities',
        ],
        color: '#F44336',
        level: 'Unhealthy',
      };
    } else {
      return {
        medical: [
          'Health warning: everyone should avoid outdoor activities',
          'Stay indoors and keep activity levels low',
          'Wear high-quality masks (N95/P100) if you must go outside',
          'Seek immediate medical attention for any respiratory symptoms',
          'Consider relocating temporarily if possible',
        ],
        avoidance: [
          'Do not go outside unless absolutely necessary',
          'Create a clean room with air purifiers',
          'Seal all windows and doors completely',
          'Avoid all physical activities',
          'Consider emergency evacuation if advised',
        ],
        color: '#9C27B0',
        level: 'Very Unhealthy',
      };
    }
  };

  const suggestions = getSuggestions(aqi);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: suggestions.color }]}>
        <Ionicons name="medical" size={24} color="white" />
        <Text style={styles.headerTitle}>Health Advisory</Text>
        <Text style={styles.levelText}>{suggestions.level}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medical Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical-outline" size={20} color="#F44336" />
            <Text style={styles.sectionTitle}>Medical Recommendations</Text>
          </View>
          {suggestions.medical.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <View style={styles.bulletPoint} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Pollution Avoidance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#2196F3" />
            <Text style={styles.sectionTitle}>Pollution Avoidance Tips</Text>
          </View>
          {suggestions.avoidance.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <View style={styles.bulletPoint} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Contacts (for severe pollution) */}
        {aqi > 150 && (
          <View style={styles.emergencySection}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="warning" size={20} color="#FF5722" />
              <Text style={styles.emergencyTitle}>Emergency Information</Text>
            </View>
            <Text style={styles.emergencyText}>
              If you experience difficulty breathing, chest pain, or severe coughing, seek immediate medical attention.
            </Text>
            <View style={styles.emergencyNumbers}>
              <Text style={styles.emergencyNumber}>Emergency: 911</Text>
              <Text style={styles.emergencyNumber}>Poison Control: 1-800-222-1222</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  levelText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  content: {
    maxHeight: 300,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginTop: 7,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  emergencySection: {
    padding: 20,
    backgroundColor: '#FFF3E0',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  emergencyNumbers: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
  },
  emergencyNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5722',
    marginBottom: 4,
  },
});