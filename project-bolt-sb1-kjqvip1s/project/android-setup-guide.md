# Android Studio Setup Guide for AirGuard

This guide will help you set up and run the AirGuard pollution checker app in Android Studio.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Android Studio**
4. **Java Development Kit (JDK) 11 or higher**

## Step-by-Step Setup

### 1. Install Android Studio

1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Install with default settings
3. Launch Android Studio and complete the setup wizard

### 2. Configure Android SDK

1. Open Android Studio
2. Go to **File > Settings** (Windows/Linux) or **Android Studio > Preferences** (Mac)
3. Navigate to **Appearance & Behavior > System Settings > Android SDK**
4. In the **SDK Platforms** tab, install:
   - Android 13 (API level 33)
   - Android 12 (API level 31)
   - Android 11 (API level 30)
5. In the **SDK Tools** tab, ensure these are installed:
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
   - Intel x86 Emulator Accelerator (if using Intel processor)

### 3. Set Up Environment Variables

Add these to your system environment variables:

**Windows:**
```bash
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT=C:\Users\YourUsername\AppData\Local\Android\Sdk
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Create Android Virtual Device (AVD)

1. In Android Studio, click **Tools > AVD Manager**
2. Click **Create Virtual Device**
3. Choose a device (recommended: **Pixel 4** or **Pixel 6**)
4. Select a system image (recommended: **API 30** or higher with Google APIs)
5. Click **Next** and then **Finish**
6. Start the emulator by clicking the play button

### 5. Prepare the React Native Project

1. **Clone or navigate to your project directory**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally:**
   ```bash
   npm install -g @expo/cli
   ```

### 6. Generate Android Project

Run this command to create the native Android project:

```bash
npx expo run:android
```

This will:
- Generate the `android` folder with native Android code
- Install dependencies
- Build and launch the app on your emulator/device

### 7. Open in Android Studio

1. Open Android Studio
2. Click **File > Open**
3. Navigate to your project folder and select the **android** folder
4. Click **OK**
5. Wait for Gradle sync to complete

### 8. Running the App

#### Option 1: Through Expo CLI (Recommended)
```bash
# Start Metro bundler
npx expo start

# In another terminal, run on Android
npx expo run:android
```

#### Option 2: Through Android Studio
1. In Android Studio, click the **Run** button (green play icon)
2. Select your emulator or connected device
3. The app will build and launch

#### Option 3: Direct APK Build
```bash
# Build APK
npx expo build:android

# Or build with EAS (recommended for production)
npm install -g @expo/eas-cli
eas build --platform android
```

## Testing on Physical Device

### Enable Developer Options
1. Go to **Settings > About Phone**
2. Tap **Build Number** 7 times
3. Developer options will be enabled

### Enable USB Debugging
1. Go to **Settings > Developer Options**
2. Enable **USB Debugging**
3. Connect your device via USB

### Run on Device
```bash
# List connected devices
adb devices

# Run on specific device
npx expo run:android --device
```

## Common Issues and Solutions

### Issue 1: "SDK location not found"
**Solution:** Set ANDROID_HOME environment variable correctly

### Issue 2: "Gradle build failed"
**Solution:** 
```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

### Issue 3: "Metro bundle failed"
**Solution:**
```bash
npx expo start --clear
```

### Issue 4: "Location permission denied"
**Solution:** 
- Go to device Settings > Apps > AirGuard > Permissions
- Enable Location permission

### Issue 5: "App crashes on startup"
**Solution:**
- Check Metro bundler is running
- Verify all dependencies are installed
- Check device logs: `adb logcat`

## Development Workflow

### 1. Development Mode
```bash
# Start with development build
npx expo start --dev-client
```

### 2. Production Testing
```bash
# Build production APK
npx expo build:android --type apk

# Install on device
adb install path/to/your/app.apk
```

### 3. Live Reload
- Shake the device or press `Ctrl+M` (Windows/Linux) or `Cmd+M` (Mac)
- Select "Enable Live Reload" for automatic updates

## Debugging

### 1. React Native Debugger
- Shake device → "Debug with Chrome"
- Open Chrome → `chrome://inspect`

### 2. Android Studio Debugger
- Use Android Studio's built-in debugger
- Set breakpoints in Java/Kotlin code
- Monitor device logs

### 3. Flipper (Advanced)
```bash
npm install -g flipper
```

## Performance Optimization

### 1. Enable Hermes (Already enabled)
Hermes is enabled by default in newer React Native versions for better performance.

### 2. Proguard (Production)
Enable code shrinking in `android/app/build.gradle`:
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. Bundle Size Optimization
```bash
# Analyze bundle
npx expo export --dump-assetmap

# Optimize images
npx expo optimize
```

## Publishing to Google Play Store

### 1. Generate Signed APK
```bash
# Using EAS Build (recommended)
eas build --platform android --profile production

# Or using Expo CLI
expo build:android --type app-bundle
```

### 2. Upload to Play Console
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Upload your AAB file
4. Complete store listing
5. Submit for review

## Useful Commands

```bash
# Check React Native environment
npx react-native doctor

# Check Expo environment
npx expo doctor

# Clear all caches
npx expo start --clear

# Run on specific emulator
npx expo run:android --variant release

# Generate APK for testing
npx expo build:android --type apk

# View device logs
adb logcat | grep -F "`adb shell ps | grep com.airguard.pollutionchecker | tr -s ' ' | cut -d' ' -f2`"
```

## Next Steps

1. **Test Core Features:**
   - Login/logout functionality
   - Location permission and access
   - Pollution data display
   - Color coding system
   - Health suggestions
   - Search functionality
   - History charts

2. **Integrate Real APIs:**
   - OpenWeatherMap Air Pollution API
   - IQAir API
   - World Air Quality Index API

3. **Add Advanced Features:**
   - Push notifications for pollution alerts
   - Offline data caching
   - User preferences and settings
   - Social sharing capabilities

4. **Optimize for Production:**
   - Enable code splitting
   - Optimize images and assets
   - Add crash reporting (Sentry)
   - Implement analytics

Your pollution checker app is now ready to run in Android Studio! The app includes all the features you requested: authentication, location-based pollution monitoring, health suggestions, historical data, and search functionality.