import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";


interface Todo {
    title: string;
    status: string;
    created_at: string;
}


interface TodoItemProps {
  todo: Todo;
  onPress: (event: GestureResponderEvent) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onPress }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      padding: 16,
      borderRadius: 8,
      marginVertical: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    }}
  >
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
        {todo.title}
      </Text>
      <Text style={{ fontSize: 12, color: "#999" }}>
        Created at: {new Date(todo.created_at).toLocaleDateString()}
      </Text>
    </View>

    <TouchableOpacity onPress={onPress}>
      <Ionicons name="arrow-forward" size={20} color="#333" />
    </TouchableOpacity>
  </View>
);

export default TodoItem;
