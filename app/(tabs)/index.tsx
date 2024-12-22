import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { fetchTodos } from "@/constants/api";  // Import the fetchTodos function

const todoBackground = require("../../assets/images/welc.png");

export default function Home() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fadeAnim = new Animated.Value(0); // Animation for the cards

  const user = {
    name: "Cobby",
    email: "andohfrancis9187@gmail.com",
    profilePic: "https://via.placeholder.com/100", // Placeholder profile image
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Use fetchTodos to get the tasks
        const tasks = await fetchTodos();

        const completed = tasks.filter((task: any) => task.status === "completed");
        const uncompleted = tasks.filter((task: any) => task.status !== "completed");

        setCompletedTasks(completed);
        setUncompletedTasks(uncompleted);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateToDetails = (task: any) => {
    router.push(`/todo/${task.id}`);
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: "white", marginTop: 16 }}>Loading tasks...</Text>
      </LinearGradient>
    );
  }

  const renderTaskCard = (item: any, isCompleted: boolean) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {isCompleted && (
        <Ionicons
          name="checkmark-circle"
          size={20}
          color="green"
          style={{ marginRight: 12 }}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Created on: {item.createdAt}
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <Ionicons name="arrow-forward" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}
    >
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          paddingHorizontal: 8,
        }}
      >
        {/* User Info Section */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: user.profilePic }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 16,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
          <View>
            <Text style={styles.greeting}>{greeting()}, {user.name}</Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {user.email}
            </Text>
          </View>
        </View>

        {/* Notification bell */}
        <View style={{ position: "relative" }}>
          <Ionicons
            name="notifications-outline"
            size={32}
            color="#FFD700"
          />
          <View
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              backgroundColor: "red",
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>2</Text>
          </View>
        </View>
      </View>

      <ImageBackground
          source={todoBackground}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 12 }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
            style={styles.overlay}
          >
            <Text style={styles.backgroundText}>Stay Organized</Text>
            <Text style={styles.backgroundSubText}>Keep track of your tasks</Text>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>

      {/* All complted  Tasks Section */}
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 8 }}>
        Completed Tasks
      </Text>
      <View style={{ maxHeight: 200 }}>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderTaskCard(item, true)}
          ListEmptyComponent={
            <Text style={{ color: "#333", textAlign: "center", fontSize: 14 }}>
              No completed tasks found.
            </Text>
          }
        />
      </View>

      {/* Uncompleted Tasks Section */}
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginTop: 24, marginBottom: 8 }}>
        Uncompleted Tasks
      </Text>
      <View style={{ maxHeight: 100 }}>
        <FlatList
          data={uncompletedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderTaskCard(item, false)}
          ListEmptyComponent={
            <Text style={{ color: "#333", textAlign: "center", fontSize: 14 }}>
              No uncompleted tasks found.
            </Text>
          }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  greeting: { fontSize: 16, color: "#FFD700", fontWeight: "600" },
  backgroundImage: {
    width: "100%",
    height: 250,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backgroundText: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  backgroundSubText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginVertical: 8,
    textAlign: "center",
  },
  getStartedButton: {
    marginTop: 16,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
