// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';
import { AuthProvider } from '@/providers/AuthProvider';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>


      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="user" options={{ headerShown: false, presentation: 'modal' }} />

        <Stack.Screen name="Comment" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="Camera" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="Search" options={{ headerShown: false }} />
        <Stack.Screen name="Followers" options={{ headerShown: false }} />
        <Stack.Screen name="Activity" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>

  );
}
