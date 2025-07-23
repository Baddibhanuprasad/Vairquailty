import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PollutionCard } from '@/components/PollutionCard';
import { SuggestionCard } from '@/components/SuggestionCard';
import { pollutionService } from '@/services/pollutionService';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a location to search');
      return;
    }

    setIsSearching(true);
    try {
      // Simulate location search and get coordinates
      const mockCoordinates = {
        lat: 40.7128 + Math.random() * 0.1,
        lon: -74.0060 + Math.random() * 0.1,
      };

      const pollution = await pollutionService.getPollutionData(
        mockCoordinates.lat,
        mockCoordinates.lon
      );
      
      setSearchResults({
        ...pollution,
        location: searchQuery,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get pollution data for this location');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Location</Text>
        <Text style={styles.headerSubtitle}>Check air quality anywhere</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter city name or address"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isSearching}
        >
          <Text style={styles.searchButtonText}>
            {isSearching ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {searchResults && (
          <View style={styles.resultsContainer}>
            <View style={styles.locationHeader}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text style={styles.locationText}>{searchResults.location}</Text>
            </View>

            <PollutionCard data={searchResults} />
            
            {searchResults.aqi > 50 && (
              <SuggestionCard aqi={searchResults.aqi} />
            )}
          </View>
        )}

        {!searchResults && !isSearching && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>
              Search for any location to check its air quality
            </Text>
          </View>
        )}
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
  searchContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  resultsContainer: {
    padding: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
});