import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Picker} from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTodos } from "@/constants/api"; // Import your API service
import { Ionicons } from '@expo/vector-icons'; // For search icon
import { useRouter, useLocalSearchParams } from "expo-router";


function TodoList() {
  const router = useRouter();
  const [todos, setTodos] = useState<any[]>([]); // Store todos
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [statusFilter, setStatusFilter] = useState<string>("all"); // Status filter

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        setError("Failed to fetch todos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (statusFilter !== "all" && todo.status !== statusFilter) return false;
    return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
    className="items-center"
      colors={["#1253AA", "#05243E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, paddingTop: 20 }}
    >
      {/* Top Row with Search and Filter */}
      <View style={{ flexDirection: "row", justifyContent: "center", paddingHorizontal: 20, marginBottom: 20 }}>
        {/* Search Input */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by title"
          style={{
            width: "65%",
            backgroundColor: "#102D53", // Custom background color
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 8,
            color: "white",
            fontSize: 16,
            marginRight: 10,
          }}
        />
        {/* Status Filter */}
        <View style={{ width: "30%" }}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={setStatusFilter}
            style={{
              backgroundColor: "#102D53", // Custom background color
              color: "white",
              borderRadius: 8,
              paddingHorizontal: 10,
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
      <FlatList

        data={filteredTodos}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center", // Center the list vertically
          paddingBottom: 20,
          height:"4%"
          
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: 12,
              padding: 15,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#666", marginVertical: 5 }}>
              {item.details}
            </Text>
            <Text style={{ fontSize: 12, color: "#999" }}>
              Created at: {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => router.push(`/todo/${item.id}`)} style={{ position: "absolute", right: 10, top: 10 }}>
  <Ionicons name="arrow-forward" size={24} color="#05243E" />
</TouchableOpacity>

          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
  );
}

export default TodoList;
