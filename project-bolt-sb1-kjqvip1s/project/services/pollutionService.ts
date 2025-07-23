export interface PollutionData {
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
}

export interface WeeklyData {
  day: string;
  dayFull: string;
  date: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
}

class PollutionService {
  // In a real app, you would use actual API endpoints like:
  // - OpenWeatherMap Air Pollution API
  // - IQAir API
  // - World Air Quality Index API
  
  private generateRandomPollutionData(baseAqi?: number): PollutionData {
    const aqi = baseAqi || Math.floor(Math.random() * 200) + 1;
    
    // Generate realistic pollutant values based on AQI
    const factor = aqi / 100;
    
    return {
      aqi,
      pm25: Math.round((Math.random() * 50 + 10) * factor),
      pm10: Math.round((Math.random() * 80 + 20) * factor),
      o3: Math.round((Math.random() * 100 + 30) * factor),
      no2: Math.round((Math.random() * 60 + 15) * factor),
      so2: Math.round((Math.random() * 40 + 5) * factor),
      co: Math.round((Math.random() * 2000 + 500) * factor),
      temperature: Math.round(Math.random() * 30 + 5),
      humidity: Math.round(Math.random() * 60 + 30),
      pressure: Math.round(Math.random() * 50 + 1000),
    };
  }

  async getPollutionData(lat: number, lon: number): Promise<PollutionData> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would make an actual API call:
    /*
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    return this.transformApiData(data);
    */
    
    // For demo purposes, generate realistic data
    return this.generateRandomPollutionData();
  }

  async getWeeklyData(): Promise<WeeklyData[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const weeklyData: WeeklyData[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      
      const aqi = Math.floor(Math.random() * 150) + 1;
      const factor = aqi / 100;
      
      weeklyData.push({
        day: days[i],
        dayFull: fullDays[i],
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi,
        pm25: Math.round((Math.random() * 50 + 10) * factor),
        pm10: Math.round((Math.random() * 80 + 20) * factor),
        o3: Math.round((Math.random() * 100 + 30) * factor),
      });
    }
    
    return weeklyData;
  }

  // Method to get real-time data from actual APIs
  async getRealPollutionData(lat: number, lon: number, apiKey: string): Promise<PollutionData> {
    try {
      // OpenWeatherMap Air Pollution API example
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch pollution data');
      }
      
      const data = await response.json();
      
      // Transform API response to our format
      const pollution = data.list[0];
      const components = pollution.components;
      
      return {
        aqi: pollution.main.aqi * 50, // Convert to US AQI scale
        pm25: Math.round(components.pm2_5 || 0),
        pm10: Math.round(components.pm10 || 0),
        o3: Math.round(components.o3 || 0),
        no2: Math.round(components.no2 || 0),
        so2: Math.round(components.so2 || 0),
        co: Math.round(components.co || 0),
        temperature: 20, // You'd get this from weather API
        humidity: 50,    // You'd get this from weather API
        pressure: 1013,  // You'd get this from weather API
      };
    } catch (error) {
      console.error('Error fetching real pollution data:', error);
      // Fallback to mock data
      return this.generateRandomPollutionData();
    }
  }
}

export const pollutionService = new PollutionService();