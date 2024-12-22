import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
  BounceIn,
} from "react-native-reanimated";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Simulate a realistic splash screen duration (4 seconds)
      await new Promise((resolve) => setTimeout(resolve, 4000));

      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding === "true") {
        router.replace("../(tabs)"); // Navigate to the main tabs page
      } else {
        router.replace("./welcome"); // Navigate to the onboarding screen
      }
    };

    checkOnboardingStatus();
  }, []);

  // Splash screen UI
  if (isLoading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Add the StatusBar component */}
        <StatusBar
          barStyle="light-content" // Use "dark-content" for light backgrounds
          translucent={true} // Make it transparent
          backgroundColor="transparent" // Transparent background
        />
        
        <Animated.View
          entering={ZoomIn.duration(800)} // Smooth zoom-in animation for the splash screen
          exiting={FadeOut.duration(600)} // Fade-out for a professional transition
          className="flex-1 items-center justify-center"
        >
          {/* Splash Logo */}
          <Animated.View entering={BounceIn.duration(1000)}>
            <Image
              source={require("../assets/images/Checkmark.png")} // Replace with your app's logo
              className="w-40 h-40 mb-6"
            />
          </Animated.View>

          {/* Splash Headline */}
          <Animated.Text
            entering={FadeIn.delay(500).duration(1200)} // Staggered fade-in for the headline
            className="text-3xl font-bold text-white"
          >
            My Awesome App
          </Animated.Text>
          <Animated.Text
            entering={FadeIn.delay(800).duration(1200)} // Slight delay for the subheadline
            className="text-lg text-gray-200 mt-2"
          >
            The best app for all your needs
          </Animated.Text>

          {/* Loading Spinner */}
          <Animated.View entering={FadeIn.delay(1200)}>
            <ActivityIndicator size="large" color="#ffffff" className="mt-8" />
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    );
  }

  return null; // Return nothing while the splash screen runs.
}
