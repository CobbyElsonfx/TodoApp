import React, { useState } from "react";
import { View, Text, Button, FlatList, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const slides = [
  {
    id: "1",
    title: "Welcome to Todo App",
    description: "Organize your tasks efficiently and stay productive!",
    backgroundColor: "#f8b400",
  },
  {
    id: "2",
    title: "Track Your Progress",
    description: "Monitor your tasks and ensure everything is on track.",
    backgroundColor: "#56cfe1",
  },
  {
    id: "3",
    title: "Stay Organized",
    description: "Categorize and filter tasks for better focus.",
    backgroundColor: "#72efdd",
  },
];

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("../tabs"); // Navigate to the main Todo page
    }
  };

  const { width } = Dimensions.get("window");

  return (
    <View style={[styles.container, { backgroundColor: slides[currentIndex].backgroundColor }]}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        scrollToIndex={{
          index: currentIndex,
        }}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        <Button title={currentIndex === slides.length - 1 ? "Get Started" : "Next"} onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dots: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
 