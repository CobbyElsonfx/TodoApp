import React, { useState, useRef } from "react";
import { View, Text, FlatList, Dimensions, ListRenderItem, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Track Your Progress",
    description: "Organize your tasks efficiently and stay productive!",
    image: require("../../assets/images/shield.png"),
  },
  {
    id: "2",
    title: "PLAN",
    description: "Plan your tasks to do, that way you’ll stay organized and you won’t skip any",
    image: require("../../assets/images/plan.png"),
  },
  {
    id: "3",
    title: "Stay Organized",
    description: "Make a full schedule for the whole week and stay organized and productive all days",
    image: require("../../assets/images/calendar.png"),
  },
];

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const router = useRouter();
  const { width } = Dimensions.get("window");

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("../(tabs)"); 
    }
  };

  const renderSlide: ListRenderItem<Slide> = ({ item }) => (
    <View style={{ width, alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* Image */}
      <Image
        source={item.image}
        style={{ width: 300, height: 200, resizeMode: "contain", marginBottom: 20 }}
      />
      <Text className="text-4xl font-bold text-white mb-4">{item.title}</Text>
      <Text className="text-lg text-center text-white leading-7 px-4">{item.description}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <FlatList
        data={slides}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        scrollEnabled={false} 
      />
  
      <View style={{ position: "absolute", bottom: 30, width: "100%", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          {/* slider bars  */}
          <View style={{ flexDirection: "row" }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={{
                  height: 4,
                  width: currentIndex === index ? 30 : 10,
                  backgroundColor: "white",
                  marginHorizontal: 5,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
          {/* button for the next page  */}
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: "white",
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {currentIndex === slides.length - 1 ? (
              <Ionicons name="checkmark" size={30} color="#1253AA" />
            ) : (
              <Ionicons name="arrow-forward" size={24} color="#1253AA" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
