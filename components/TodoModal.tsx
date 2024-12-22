import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type TodoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  creatingTodo: boolean;
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  newTodoDetails: string;
  setNewTodoDetails: (details: string) => void;
  newTodoStatus: string;
  setNewTodoStatus: (status: string) => void;
};

const TodoModal: React.FC<TodoModalProps> = ({
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
    <View style={styles.overlay}>
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Todo</Text>
        <Text style={styles.modalSubtitle}>
          Enter the details for your new task below.
        </Text>

        {/* Todo Title Input */}
        <TextInput
          placeholder="Todo Title"
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          style={styles.input}
          placeholderTextColor="#AAB2BB"
        />

        {/* Todo Details Input */}
        <TextInput
          placeholder="Details (optional)"
          value={newTodoDetails}
          onChangeText={setNewTodoDetails}
          style={[styles.input, styles.textArea]}
          placeholderTextColor="#AAB2BB"
          multiline={true}
        />

        {/* Status Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={newTodoStatus}
            onValueChange={setNewTodoStatus}
            style={styles.picker}
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
          style={[
            styles.submitButton,
            { backgroundColor: creatingTodo ? "#AAB2BB" : "#05243E" },
          ]}
        >
          <Text style={styles.submitButtonText}>
            {creatingTodo ? "Adding..." : "Add Todo"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
    color: "#05243E",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#7D7D7D",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  picker: {
    flex: 1,
    color: "#05243E",
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "#05243E",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TodoModal;
