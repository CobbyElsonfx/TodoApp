import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodosThunk } from "@/store/todoSlice"; // Redux action for fetching todos
import { useRouter } from "expo-router";
import { RootState, AppDispatch } from "@/store/store"; // Assuming RootState and AppDispatch are defined in the store

const todoBackground = require("../../assets/images/welc.png");

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Use ref for animation value

  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

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
    // Dispatch the Redux action to fetch tasks
    dispatch(fetchTodosThunk());

    // Start fade animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [dispatch]);

  const navigateToDetails = (task: any) => {
    router.push(`/todo/${task.id}`);
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: "white", marginTop: 16 }}>Loading tasks...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        style={styles.loadingContainer}
      >
        <Text style={{ color: "red", marginTop: 16 }}>Error: {error}</Text>
      </LinearGradient>
    );
  }

  // Separate completed and uncompleted tasks
  const completedTasks = todos.filter((task) => task.status === "completed");
  const uncompletedTasks = todos.filter((task) => task.status !== "completed");

  const renderTaskCard = (item: any, isCompleted: boolean) => (
    <View style={styles.taskCard}>
      {isCompleted && (
        <Ionicons name="checkmark-circle" size={20} color="green" style={styles.taskIcon} />
      )}
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskSubtitle}>Created on: {item.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <Ionicons name="arrow-forward" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.header}>
        {/* User Info Section */}
        <View style={styles.userInfo}>
          <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
          <View>
            <Text style={styles.greeting}>{greeting()}, {user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Notification Bell */}
        <View style={styles.notificationBell}>
          <Ionicons name="notifications-outline" size={32} color="#FFD700" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>2</Text>
          </View>
        </View>
      </View>

      {/* Background Image Section */}
      <ImageBackground source={todoBackground} style={styles.backgroundImage} imageStyle={{ borderRadius: 12 }}>
        <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]} style={styles.overlay}>
          <Text style={styles.backgroundText}>Stay Organized</Text>
          <Text style={styles.backgroundSubText}>Keep track of your tasks</Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text >Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>

      {/* Completed Tasks Section */}
      <Text style={styles.sectionTitle}>Completed Tasks</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderTaskCard(item, true)}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No completed tasks found.</Text>}
      />

      {/* Uncompleted Tasks Section */}
      <Text style={[styles.sectionTitle, styles.uncompletedSectionTitle]}>Uncompleted Tasks</Text>
      <FlatList
        data={uncompletedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderTaskCard(item, false)}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No uncompleted tasks found.</Text>}
      />
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  greeting: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.8)",
  },
  notificationBell: {
    position: "relative",
  },
  notificationBadge: {
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
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  uncompletedSectionTitle: {
    marginTop: 24,
  },
  taskCard: {
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
  },
  taskIcon: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  taskSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  emptyMessage: {
    color: "#333",
    textAlign: "center",
    fontSize: 14,
  },
});