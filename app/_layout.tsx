import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { PortalHost } from "@rn-primitives/portal"
import "../global.css"


import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(home)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <PortalHost />
      </ThemeProvider>
    </ClerkProvider>
  );
}
