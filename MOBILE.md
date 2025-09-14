# 📱 DayOne Mobile Setup

Your DayOne habit tracker is now mobile-ready with **Capacitor**! This guide will help you run it on iOS and Android devices.

## 🚀 Quick Start (Development)

The app is configured for **hot reload** - you can see live changes on your mobile device as you develop!

### Running in Mobile Browser
1. Open your mobile browser
2. Navigate to: https://2f36f952-c369-46f1-b512-f5e2c855c367.lovableproject.com
3. Add to home screen for a native-like experience

### Running as Native App

## 📋 Prerequisites

**For iOS:**
- Mac with Xcode installed
- iOS Simulator or physical iOS device

**For Android:**
- Android Studio installed
- Android emulator or physical Android device

## 🛠️ Setup Instructions

### 1. Export to GitHub
First, export your project to GitHub using the "Export to GitHub" button in Lovable.

### 2. Clone and Setup
```bash
# Clone your exported repository
git clone <YOUR_GITHUB_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Add mobile platforms
npx cap add ios     # For iOS
npx cap add android # For Android

# Update native dependencies
npx cap update ios     # For iOS
npx cap update android # For Android

# Build the web app
npm run build

# Sync with native platforms
npx cap sync
```

### 3. Run on Device/Simulator

**iOS:**
```bash
npx cap run ios
```
This will open Xcode - click the play button to run on simulator or device.

**Android:**
```bash
npx cap run android
```
This will open Android Studio - click run to launch on emulator or device.

## 🎯 Mobile Features

✨ **Native Capabilities:**
- **Haptic Feedback** - Feel the satisfaction when completing habits
- **Status Bar Styling** - Matches your light/dark theme
- **Safe Area Support** - Respects device notches and home indicators
- **Touch Optimized** - 44px minimum touch targets for better usability
- **Native Performance** - Smooth animations and transitions

🎨 **Mobile-Optimized UI:**
- Neumorphic touch feedback that responds to finger taps
- Proper safe area insets for all devices
- Optimized touch targets for mobile interaction
- Mobile-specific hover states and animations

## 🔄 Development Workflow

1. Make changes in Lovable
2. Changes automatically sync to your GitHub repository
3. Pull latest changes: `git pull`
4. Sync to mobile: `npx cap sync`
5. Your mobile app reflects the changes instantly!

## 📱 Device Testing

**Physical Device Benefits:**
- Test real haptic feedback
- Accurate performance testing
- True-to-life user experience
- Camera and native feature testing

**Simulator/Emulator:**
- Faster development cycle
- Multiple device size testing
- Debug tools access

## 🔧 Configuration

The mobile app is pre-configured with:
- **App ID:** `app.lovable.2f36f952c36946f1b512f5e2c855c367`
- **App Name:** `neo-habit`
- **Hot Reload:** Enabled for development
- **Splash Screen:** Configured with brand colors
- **Status Bar:** Dynamic styling for light/dark modes

## 📖 Learn More

For detailed mobile development guidance and troubleshooting, read our comprehensive blog post: [Lovable Mobile Development Guide](https://lovable.dev/blogs/TODO)

## 🆘 Common Issues

**Build Errors:**
- Make sure all dependencies are installed: `npm install`
- Try cleaning and rebuilding: `npm run build && npx cap sync`

**iOS Issues:**
- Ensure Xcode is updated to latest version
- Check iOS deployment target in project settings

**Android Issues:**
- Verify Android Studio and SDK are properly installed
- Check Gradle sync in Android Studio

---

Happy habit tracking on mobile! 🎉