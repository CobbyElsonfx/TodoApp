import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTodos, createTodo } from "@/constants/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TodoModal from "@/components/TodoModal";
import TodoItem from "@/components/TodoItem";
import { Picker } from "@react-native-picker/picker";

function TodoList() {
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDetails, setNewTodoDetails] = useState("");
  const [newTodoStatus, setNewTodoStatus] = useState("not_started");
  const [creatingTodo, setCreatingTodo] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch {
        Alert.alert("Error", "Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) {
      Alert.alert("Validation Error", "Title is required.");
      return;
    }
    setCreatingTodo(true);
    try {
      const createdTodo = await createTodo({
        title: newTodoTitle,
        details: newTodoDetails || null,
        status: newTodoStatus,
      });
      setTodos([...todos, createdTodo]);
      setModalVisible(false);
      setNewTodoTitle("");
      setNewTodoDetails("");
      setNewTodoStatus("not_started");
    } catch {
      Alert.alert("Error", "Failed to add todo.");
    } finally {
      setCreatingTodo(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      style={{ flex: 1, paddingHorizontal: 20 }}
    >
      {/* Search and Filter Container */}
      <View
        style={{
          width: "100%", // Adjusted width to 100% for responsiveness
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20, // Added margin bottom for spacing
          paddingHorizontal: 10,
          flexWrap: "wrap", // Allows wrapping of elements on smaller screens
        }}
      >
        {/* Enhanced Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1A3E5C",
            borderRadius: 30,
            paddingHorizontal: 5,
            paddingVertical: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            marginTop: "1rem",
            elevation: 5, // for Android shadow
            flex: 1, // Allow search bar to take full width
            marginBottom: 12, // Added margin bottom for spacing between search and filter
            maxWidth: 400, // Restrict the max width for search bar
          }}
        >
          <Ionicons name="search" size={22} color="#fff" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search tasks..."
            placeholderTextColor="#AAB2BB"
            style={{
              flex: 1,
              marginLeft: 12,
              color: "#fff",
              fontSize: 13,
              fontFamily: "System",
            }}
          />
        </View>

        {/* Enhanced Filter Dropdown */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1A3E5C",
            borderRadius: 30,
            paddingHorizontal: 5,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
            flex: 1, // Allow filter dropdown to take full width
            maxWidth: 200, // Restrict max width for dropdown
          }}
        >
          <Picker
            selectedValue={statusFilter}
            onValueChange={setStatusFilter}
            dropdownIconColor="#fff"
            style={{
              flex: 1,
              color: "#fff",
              backgroundColor: "#1A3E5C",
              fontSize: 16,
              fontFamily: "System",
              outlineColor: "none",
            }}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="In Progress" value="in_progress" />
            <Picker.Item label="Completed" value="completed" />
            <Picker.Item label="Not Started" value="not_started" />
          </Picker>
     
        </View>
      </View>

      {/* Todo List Container */}
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 8 }}>
          List of Todo's
        </Text>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {todos.length === 0 ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="document-text-outline" size={48} color="#fff" />
                <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>No todos found</Text>
              </View>
            ) : (
              <View style={{ maxHeight: "60%", justifyContent: "center" }}>
                <FlatList
                  data={todos}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TodoItem todo={item} onPress={() => router.push(`/todo/${item.id}`)} />
                  )}
                  style={{ flex: 1 }}
                />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#1253AA",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Todo Modal */}
      <TodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTodo}
        creatingTodo={creatingTodo}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        newTodoDetails={newTodoDetails}
        setNewTodoDetails={setNewTodoDetails}
        newTodoStatus={newTodoStatus}
        setNewTodoStatus={setNewTodoStatus}
      />
    </LinearGradient>
  );
}

export default TodoList;
