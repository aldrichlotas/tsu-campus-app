import { Stack } from 'expo-router';
import { DemoProvider } from '../context/DemoContext';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { 
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold 
} from '@expo-google-fonts/playfair-display';
import { 
  Manrope_400Regular, 
  Manrope_600SemiBold, 
  Manrope_700Bold 
} from '@expo-google-fonts/manrope';
import { useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
(Text as any).defaultProps.maxFontSizeMultiplier = 1.2;

if ((TextInput as any).defaultProps == null) (TextInput as any).defaultProps = {};
(TextInput as any).defaultProps.maxFontSizeMultiplier = 1.2;

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
    <SafeAreaProvider>
      <DemoProvider>
        <View style={{ flex: 1, width: '100%' }}>
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
        </View>
      </DemoProvider>
    </SafeAreaProvider>
  );
}
