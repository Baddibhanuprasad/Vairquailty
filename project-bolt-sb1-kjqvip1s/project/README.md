# AirGuard - Pollution Checker App

A comprehensive React Native Expo app for monitoring air quality and pollution levels with real-time data, health recommendations, and location-based alerts.

## Features

- **User Authentication**: Secure login and signup system
- **Real-time Pollution Monitoring**: Live AQI and pollutant data based on your location
- **Color-coded Health Indicators**: Visual representation of air quality levels
- **Health Advisory System**: Medical recommendations and pollution avoidance tips
- **7-Day History**: Historical pollution data with interactive charts
- **Location Search**: Check air quality in any location worldwide
- **Weather Integration**: Temperature, humidity, and pressure data
- **Comprehensive Pollutant Tracking**: PM2.5, PM10, O3, NO2, SO2, and CO levels

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab-based navigation
- **UI Components**: Native React Native components with custom styling
- **Icons**: Ionicons from @expo/vector-icons
- **Location Services**: expo-location
- **State Management**: React hooks and AsyncStorage
- **Animations**: expo-linear-gradient for visual effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Running on Android Studio

1. **Install Android Studio**: Download and install from [developer.android.com](https://developer.android.com/studio)

2. **Set up Android SDK**: Make sure you have the latest Android SDK installed

3. **Create Android Virtual Device (AVD)**:
   - Open Android Studio
   - Go to Tools > AVD Manager
   - Create a new virtual device (recommended: Pixel 4 with API 30+)

4. **Generate Development Build**:
   ```bash
   npx expo run:android
   ```

5. **Alternative - Expo Development Build**:
   ```bash
   npx expo install expo-dev-client
   npx expo run:android
   ```

### Running on Physical Android Device

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect your device via USB
4. Run:
   ```bash
   npx expo run:android --device
   ```

## Project Structure

```
├── app/                    # App routes and screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen with current pollution
│   │   ├── search.tsx     # Search pollution by location
│   │   ├── history.tsx    # 7-day pollution history
│   │   └── profile.tsx    # User profile and settings
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Login/authentication screen
├── components/            # Reusable components
│   ├── PollutionCard.tsx  # Detailed pollution display
│   └── SuggestionCard.tsx # Health recommendations
├── services/              # API and data services
│   └── pollutionService.ts # Pollution data management
└── hooks/                 # Custom React hooks
    └── useFrameworkReady.ts
```

## Key Components

### PollutionCard
Displays detailed pollutant information including:
- PM2.5, PM10, O3, NO2, SO2, CO levels
- Weather conditions (temperature, humidity, pressure)
- Visual indicators with appropriate icons

### SuggestionCard
Provides health recommendations based on AQI levels:
- Medical advice for different pollution levels
- Pollution avoidance strategies
- Emergency information for severe pollution

### Pollution Service
Handles data fetching and management:
- Real-time pollution data retrieval
- Weekly historical data
- Support for actual API integration (OpenWeatherMap, IQAir)

## API Integration

The app is designed to work with real pollution APIs. To integrate with actual services:

1. **OpenWeatherMap Air Pollution API**:
   ```typescript
   const API_KEY = 'your-api-key';
   const data = await pollutionService.getRealPollutionData(lat, lon, API_KEY);
   ```

2. **IQAir API**: Update the service to use IQAir endpoints

3. **World Air Quality Index API**: Alternative data source

## Color Coding System

- **Green (0-50)**: Good air quality
- **Yellow (51-100)**: Moderate air quality
- **Orange (101-150)**: Unhealthy for sensitive groups
- **Red (151-200)**: Unhealthy
- **Purple (201+)**: Very unhealthy

## Permissions

The app requires the following permissions:
- **Location**: To get current position for local air quality data
- **Internet**: To fetch pollution and weather data

## Building for Production

### Android APK
```bash
npx expo build:android
```

### Android App Bundle (AAB)
```bash
npx expo build:android -t app-bundle
```

### iOS
```bash
npx expo build:ios
```

## Testing on Android Studio

1. **Emulator Testing**:
   - Start Android Studio
   - Launch your AVD
   - Run `npx expo run:android`

2. **Physical Device Testing**:
   - Enable Developer Mode on Android device
   - Connect via USB or WiFi debugging
   - Run `npx expo run:android --device`

## Troubleshooting

### Common Android Studio Issues

1. **Gradle Build Errors**: 
   - Clean and rebuild: `cd android && ./gradlew clean && cd ..`
   - Run: `npx expo run:android`

2. **Metro Bundle Errors**:
   - Clear cache: `npx expo start --clear`

3. **Location Permission Denied**:
   - Check device settings
   - Ensure location services are enabled

### Performance Optimization

- Use production builds for performance testing
- Enable Hermes for Android (included by default)
- Optimize images and assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check the Expo documentation
- React Native community support