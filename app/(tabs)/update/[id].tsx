import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { fetchTodoById, updateTodo } from "@/constants/api"; // Add your API functions

export default function UpdateTodo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("in_progress");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the existing todo details
  useEffect(() => {
    const getTodoDetails = async () => {
      try {
        const todo = await fetchTodoById(id); // Fetch todo by ID
        setTitle(todo.title);
        setDescription(todo.details);
        setStatus(todo.status);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch todo details. Please try again.");
        router.back(); // Navigate back if there's an error
      } finally {
        setLoading(false);
      }
    };

    getTodoDetails();
  }, [id]);

  // Handle update functionality
  const handleUpdate = async () => {
    if (!title || !description) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await updateTodo(id, { title, details: description, status }); // Update API call
      Alert.alert("Success", "Todo updated successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to update todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1253AA" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}>Update Task</Text>

      {/* Title Input */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Task Title"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      {/* Description Input */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Task Description"
        style={[styles.input, styles.textArea]}
        placeholderTextColor="#aaa"
        multiline
      />

      {/* Status Picker */}
      <Picker
        selectedValue={status}
        onValueChange={setStatus}
        style={styles.picker}
      >
        <Picker.Item label="In Progress" value="in_progress" />
        <Picker.Item label="Completed" value="completed" />
        <Picker.Item label="Not Started" value="not_started" />
      </Picker>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#ff5c5c",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
});
