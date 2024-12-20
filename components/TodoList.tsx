import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../constants/api';

const TodoList =({ navigation }: any) => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks', {
        params: statusFilter ? { status: statusFilter } : {},
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setStatusFilter(null)}>
          <Text style={styles.filterButton}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStatusFilter('completed')}>
          <Text style={styles.filterButton}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStatusFilter('pending')}>
          <Text style={styles.filterButton}>Pending</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            style={styles.taskItem}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('TaskForm', { task: null })}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  filters: { flexDirection: 'row', marginBottom: 16 },
  filterButton: { marginHorizontal: 8, color: 'blue' },
  taskItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 32,
  },
  addButtonText: { color: 'white', fontWeight: 'bold' },
});

export default TodoList
