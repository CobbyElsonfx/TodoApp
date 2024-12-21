import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTodos } from "@/constants/api"; // Import your API service

function TodoList() {
  const [todos, setTodos] = useState<any[]>([]); // Store todos
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

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

  if (error) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1 items-center justify-center"
      >
        <Text className="text-red-400 text-lg">{error}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 items-center pt-10"
    >
      <FlatList
        data={todos}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="w-11/12 bg-white rounded-lg p-4 my-2 shadow-md">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-600">{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
  );
}

export default TodoList;
