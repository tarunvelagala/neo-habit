import { useEffect, useState } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

export function useMobile() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    
    // Hide splash screen when app is ready
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide();
    }
  }, []);

  // Haptic feedback functions
  const hapticLight = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  const hapticMedium = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    }
  };

  const hapticHeavy = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }
  };

  // Status bar configuration
  const setStatusBarLight = async () => {
    if (isNative) {
      await StatusBar.setStyle({ style: Style.Light });
    }
  };

  const setStatusBarDark = async () => {
    if (isNative) {
      await StatusBar.setStyle({ style: Style.Dark });
    }
  };

  return {
    isNative,
    hapticLight,
    hapticMedium,
    hapticHeavy,
    setStatusBarLight,
    setStatusBarDark,
  };
}