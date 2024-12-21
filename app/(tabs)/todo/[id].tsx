import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "@/constants/api";
import axios from 'axios';


export default function TodoDetails() {
  const { id } = useLocalSearchParams(); // Get todo ID from the route
  const router = useRouter();
  const [todo, setTodo] = useState<any>(null); // Store the specific todo
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`); // Fetch the todo by ID
        setTodo(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch todo details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  if (loading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.centered}
      >
        <Text style={{ color:  "white", fontSize: 18 }}>Loading...</Text>
      </LinearGradient>
    );
  }

  if (!todo) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>Todo not found</Text>
      </View>
    );
  }

  // Handle actions
  const deleteTodo = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Call API to delete the task
      Alert.alert("Success", "Todo deleted successfully!");
      router.push("/todoList"); // Navigate back to the list
    } catch (error) {
      Alert.alert("Error", "Failed to delete the todo.");
    }
  };

  const markAsCompleted = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, { ...todo, status: "completed" }); // Update status
      Alert.alert("Success", "Todo marked as completed!");
      setTodo({ ...todo, status: "completed" }); // Update state
    } catch (error) {
      Alert.alert("Error", "Failed to update the todo.");
    }
  };

  const pinTodo = () => {
    Alert.alert("Pinned", "This todo has been pinned!");
    // Add pin logic here (e.g., set a pinned field in your API/database)
  };

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.description}>{todo.details}</Text>
        <Text style={styles.status}>
          Status:{" "}
          <Text style={{ fontWeight: "bold", color: todo.status === "completed" ? "green" : "red" }}>
            {todo.status}
          </Text>
        </Text>
        <View style={styles.buttonRow}>
          {/* Delete Button */}
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteTodo}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          {/* Mark as Completed Button */}
          <TouchableOpacity style={[styles.button, styles.completedButton]} onPress={markAsCompleted}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          {/* Pin Button */}
          <TouchableOpacity style={[styles.button, styles.pinButton]} onPress={pinTodo}>
            <Text style={styles.buttonText}>Pin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  description: { fontSize: 16, marginBottom: 20, color: "#555" },
  status: { fontSize: 14, marginBottom: 20, color: "#777" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: { backgroundColor: "#E74C3C" },
  completedButton: { backgroundColor: "#2ECC71" },
  pinButton: { backgroundColor: "#F1C40F" },
  buttonText: { color: "white", fontWeight: "bold" },
});
