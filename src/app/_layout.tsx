import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold
} from '@expo-google-fonts/manrope';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold
} from '@expo-google-fonts/playfair-display';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DemoProvider } from '../context/DemoContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <DemoProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#800000' }, // Institutional Maroon
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'PlayfairDisplay_600SemiBold',
            fontSize: 18
          },
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: '#F4F5F7' } // Surface Slate
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="shuttle/index" options={{ headerShown: false }} />
        <Stack.Screen name="shuttle/ticket" options={{ headerShown: false }} />
        <Stack.Screen name="canteen/index" options={{ headerShown: false }} />
        <Stack.Screen name="canteen/tracker" options={{ headerShown: false }} />
        <Stack.Screen name="print/index" options={{ headerShown: false }} />
        <Stack.Screen name="merch/index" options={{ headerShown: false }} />
      </Stack>
    </DemoProvider>
  );
}
