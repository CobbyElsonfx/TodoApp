import React, { useState, useEffect } from "react";
import { FlatList, Text, TextInput, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTodos } from "@/constants/api"; // Import your API service
import { FontAwesome } from "@expo/vector-icons";

function TodoList() {


  const todosListAll = [
    {
      id: 1,
      title: "Write Blog Post",
      details:
        "Write an in-depth blog post about web development trends in 2024.",
      status: "in_progress",
      created_at: "2024-12-19T10:00:00.000000Z",
      updated_at: "2024-12-19T12:00:00.000000Z",
    },
    {
      id: 2,
      title: "Prepare Presentation",
      details:
        "Create slides for the upcoming team meeting on project updates.",
      status: "not_started",
      created_at: "2024-12-18T09:30:00.000000Z",
      updated_at: null,
    },
    {
      id: 3,
      title: "Fix Website Bug",
      details: "Resolve the issue with the contact form not sending emails.",
      status: "completed",
      created_at: "2024-12-17T15:45:00.000000Z",
      updated_at: "2024-12-18T16:00:00.000000Z",
    },
    {
      id: 4,
      title: "learn today",
      details: "Sample details",
      status: "not_started",
      created_at: "2024-12-11T10:50:27.000000Z",
      updated_at: "2024-12-11T10:50:27.000000Z",
    },
    {
      id: 5,
      title: "Organize Workspace",
      details:
        "Declutter and reorganize the workspace for better productivity.",
      status: "in_progress",
      created_at: "2024-12-19T14:20:00.000000Z",
      updated_at: "2024-12-19T14:45:00.000000Z",
    },
    {
      id: 6,
      title: "Plan Vacation",
      details:
        "Research destinations and create a travel itinerary for the new year.",
      status: "not_started",
      created_at: "2024-12-20T08:00:00.000000Z",
      updated_at: null,
    },
  ]; 


  const [todos, setTodos] = useState<any[]>([]); // Store todos
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [filter, setFilter] = useState<string>(""); // Filter state
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todosListAll);
      } catch (err) {
        setError("Failed to fetch todos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter && todo.status !== filter) return false;
    if (searchQuery && !todo.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1 items-center justify-center"
      >
        <Text className="text-white text-lg">Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 items-center pt-10 px-4"
    >
      {/* Top Inputs */}
      <View className="w-full flex-row justify-between items-center mb-4">
        {/* Search Input */}
        <View className="flex-row items-center bg-gradient-to-r from-blue-800 to-blue-900 rounded-md flex-1 mr-2 p-2">
          <FontAwesome name="search" size={20} color="#FFF" />
          <TextInput
            placeholder="Search by title"
            placeholderTextColor="#FFF"
            className="ml-2 text-white flex-1"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Filter Dropdown */}
        <View className="w-1/3 bg-gradient-to-r from-blue-800 to-blue-900 rounded-md p-2">
          <TextInput
            placeholder="Filter"
            placeholderTextColor="#FFF"
            className="text-white"
            value={filter}
            onChangeText={(text) => setFilter(text)}
          />
        </View>
      </View>

      {/* Todo List */}
      <FlatList
        data={filteredTodos}
        contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-11/12 bg-white rounded-lg p-4 my-2 shadow-md flex-row justify-between items-center"
          >
            <View>
              <Text className="text-lg font-bold text-gray-800">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-600 truncate">
                {item.description}
              </Text>
              <Text className="text-xs text-gray-400">{item.dateCreated}</Text>
            </View>
            <FontAwesome name="arrow-right" size={20} color="#888" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
  );
}

export default TodoList;
