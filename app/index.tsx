import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding === "true") {
        router.replace("../(tabs)"); // Navigate to the main tabs page
      } else {
        router.replace("./welcome/index"); // Navigate to the onboarding screen
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-500">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-2xl font-bold text-white">Welcome to My App!</Text>
      <TouchableOpacity
        onPress={() => router.replace("./welcome/index")}
        className="mt-5 bg-white px-4 py-2 rounded-lg"
      >
        <Text className="text-blue-500 font-semibold">Go to Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}
