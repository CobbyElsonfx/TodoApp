import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../styles/global.css";
import { Provider } from "react-redux"; 
import { store } from "../store/store"; 

import { useColorScheme } from "@/components/useColorScheme";

export {

  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(value === "true"); // Set state based on the flag
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    // Show a loading spinner while checking onboarding status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1253AA" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, 
          }}
        />
        <Stack.Screen
          name="welcome/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="todo/[id]"
          options={{
            headerShown: false, 
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

