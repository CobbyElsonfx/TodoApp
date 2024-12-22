import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, } from "react-native";
import { Picker } from "@react-native-picker/picker";

const TodoModal = ({
  visible,
  onClose,
  onSubmit,
  creatingTodo,
  newTodoTitle,
  setNewTodoTitle,
  newTodoDetails,
  setNewTodoDetails,
  newTodoStatus,
  setNewTodoStatus,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        {/* Modal Header */}
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 5, color: "#05243E" }}>
          Add New Todo
        </Text>
        <Text style={{ fontSize: 14, color: "#7D7D7D", marginBottom: 20 }}>
          Enter the details for your new task below.
        </Text>

        {/* Todo Title Input */}
        <TextInput
          placeholder="Todo Title"
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          style={{
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            color: "#333",
            marginBottom: 15,
            backgroundColor: "#F9F9F9",
          }}
          placeholderTextColor="#AAB2BB"
        />

        {/* Todo Details Input */}
        <TextInput
          placeholder="Details (optional)"
          value={newTodoDetails}
          onChangeText={setNewTodoDetails}
          style={{
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            color: "#333",
            marginBottom: 15,
            backgroundColor: "#F9F9F9",
          }}
          placeholderTextColor="#AAB2BB"
          multiline={true}
        />

        {/* Status Picker */}
        <View className="mb-5 bg-gray-100 border border-gray-100 rounded-lg">
          <Picker
            selectedValue={newTodoStatus}
            onValueChange={setNewTodoStatus}
            className="text-base text-[#05243E] px-4 py-2 bg-[#05243E] rounded-lg"
          >
            <Picker.Item label="Not Started" value="not_started" />
            <Picker.Item label="In Progress" value="in_progress" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          onPress={onSubmit}
          disabled={creatingTodo}
          style={{
            backgroundColor: creatingTodo ? "#AAB2BB" : "#05243E",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            {creatingTodo ? "Adding..." : "Add Todo"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={{ alignItems: "center", paddingVertical: 12 }}>
          <Text style={{ color: "#05243E", fontSize: 16, fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default TodoModal;
