import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTodoById, deleteTodo, updateTodo } from "@/constants/api"; 

export default function TodoDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [todo, setTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // Fetch the todo when the component mounts
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await fetchTodoById(Number(id)); // Fetch todo by ID
        setTodo(data);
        setTitle(data?.title);
        setDetails(data?.description);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch todo details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  // Handle deleting the todo
  const handleDelete = async () => {
    try {
      await deleteTodo(Number(id)); // Delete todo by ID
      Alert.alert("Success", "Todo deleted successfully!");
      router.push("/todoList");
    } catch (error) {
      Alert.alert("Error", "Failed to delete the todo.");
    }
  };

  // Mark the todo as completed
  const handleMarkAsCompleted = async () => {
    try {
      await updateTodo(Number(id), { title, description: details }); // Update todo to mark as completed
      Alert.alert("Success", "Todo marked as completed!");
      setTodo({ ...todo, status: "completed" });
    } catch (error) {
      Alert.alert("Error", "Failed to update the todo.");
    }
  };

  // Handle updating the todo
  const handleUpdate = async () => {
    try {
      await updateTodo(Number(id), { title, description: details }); // Update todo with new values
      Alert.alert("Success", "Todo updated successfully!");
      setTodo({ ...todo, title, description: details });
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update the todo.");
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={["#1253AA", "#05243E"]} style={styles.centered}>
        <StatusBar barStyle="light-content" backgroundColor="#1253AA" />
        <Text style={{ color: "white", fontSize: 18 }}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#1253AA", "#05243E"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1253AA" />
      {/* Back Button and Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      {/* Todo Details */}
      <View style={styles.content}>
        <View>
          <View style={styles.contentInner}>
            <View style={styles.titleRow}>
              <Text style={styles.todoTitle}>{todo.title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="create-outline" size={22} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.todoDate}>
              {new Date(todo.created_at).toDateString()}
            </Text>
          </View>

          <View style={styles.separator} />
          <Text style={styles.todoDescription}>
            {todo.details || "No description available."}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleMarkAsCompleted}>
          <Ionicons name="checkmark-done-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Update */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Task</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={details}
              onChangeText={setDetails}
              placeholder="Details"
              placeholderTextColor="#999"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleUpdate}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 , marginTop: 30},
  headerTitle: { color: "white", fontSize: 20, marginLeft: 10 },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  contentInner: {
    flexDirection:"column",
    justifyContent:"center",



  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  todoTitle: { color: "white", fontSize: 24, fontWeight: "bold", marginRight:10 },
  todoDate: { color: "#B0C4DE", fontSize: 14, marginTop: 5 },
  separator: { height: 0.5, backgroundColor: "#B0C4DE", marginVertical: 40 },
  todoDescription: { color: "white", fontSize: 16, lineHeight: 24 , marginTop: 10},
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A3E5C",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { color: "white", marginLeft: 8 },
  modalContainer: { flex: 1, justifyContent: "flex-end" },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: { height: 80 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: { backgroundColor: "#E74C3C" },
  saveButton: { backgroundColor: "#2ECC71" },
  modalButtonText: { color: "white" },
});
