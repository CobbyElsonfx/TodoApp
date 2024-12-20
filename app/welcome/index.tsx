import React, { useState, useRef } from "react";
import { View, Text, FlatList, Dimensions, ListRenderItem, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string; // Placeholder for an image (if needed)
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Track Your Progress",
    description: "Organize your tasks efficiently and stay productive!",
    image: require("../../assets/images/shield.png"), // Local image
  },
  {
    id: "2",
    title: "PLAN",
    description: "Plan your tasks to do, that way you’ll stay organized and you won’t skip any",
    image: require("../../assets/images/plan.png"), // Local image
  },
  {
    id: "3",
    title: "Stay Organized",
    description: "Make a full schedule for the whole week and stay organized and productive all days",
    image: require("../../assets/images/calendar.png"), // Local image
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
      router.replace("../tabs"); // Navigate to the main Todo page
    }
  };

  const renderSlide: ListRenderItem<Slide> = ({ item }) => (
    <View style={{ width, alignItems: "center", justifyContent: "center", padding: 20 }}>
          <Image
        source={item.image}
        style={{ width: 300, height: 200, resizeMode: "contain", marginBottom: 20 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 15 }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", color: "white", marginBottom: 30 }}>
        {item.description}
      </Text>
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
        scrollEnabled={false} // Prevent manual swiping
      />
      <View style={{ position: "absolute", bottom: 30, width: "100%", alignItems: "center" }}>
        {/* Slider Bars */}
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
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
        {/* Next Button */}
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
          <Ionicons name="arrow-forward" size={24} color="#1253AA" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
