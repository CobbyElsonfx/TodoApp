import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchTodosThunk,
  createTodoThunk,
  deleteTodoThunk,
  updateTodoThunk,
} from "@/store/todoSlice";
import TodoModal from "@/components/TodoModal";
import TodoItem from "@/components/TodoItem";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDetails, setNewTodoDetails] = useState<string>("");
  const [newTodoStatus, setNewTodoStatus] = useState<string>("not_started");

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const handleAddTodo = async (): Promise<void> => {
    if (!newTodoTitle.trim()) {
      Alert.alert("Validation Error", "Title is required.");
      return;
    }

    const newTodo = {
      title: newTodoTitle,
      details: newTodoDetails || "",
      status: newTodoStatus,
    };

    dispatch(createTodoThunk(newTodo))
      .unwrap()
      .then(() => {
        setModalVisible(false);
        setNewTodoTitle("");
        setNewTodoDetails("");
        setNewTodoStatus("not_started");
      })
      .catch(() => {
        Alert.alert("Error", "Failed to add todo.");
      });
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "all") return true;
    return todo.status === statusFilter;
  });

  const searchedTodos = filteredTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (error) {
    return (
      <LinearGradient
        colors={["#1253AA", "#05243E"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
      >
        <Ionicons name="alert-circle-outline" size={48} color="white" />
        <Text style={{ color: "white", fontSize: 18, textAlign: "center", marginTop: 10 }}>{error}</Text>
        <TouchableOpacity
          onPress={() => dispatch(fetchTodosThunk())}
          style={{
            marginTop: 20,
            backgroundColor: "#1A3E5C",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Retry</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60, 
      }}
    >
    
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1A3E5C",
            borderRadius: 30,
            paddingHorizontal: 16,
            paddingVertical: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
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
              fontSize: 16,
              fontFamily: "System",
            }}
          />
        </View>

        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1A3E5C",
            borderRadius: 30,
            paddingHorizontal: 16,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
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
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginBottom: 8,
          }}
        >
          List of Todos
        </Text>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <FlatList
            data={searchedTodos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TodoItem todo={item} onPress={() => router.push(`/todo/${item.id}`)} />
            )}
            ListEmptyComponent={
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="document-text-outline" size={48} color="#fff" />
                <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>No todos found</Text>
              </View>
            }
          />
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
        creatingTodo={loading}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        newTodoDetails={newTodoDetails}
        setNewTodoDetails={setNewTodoDetails}
        newTodoStatus={newTodoStatus}
        setNewTodoStatus={setNewTodoStatus}
      />
    </LinearGradient>
  );
};

export default TodoList;
