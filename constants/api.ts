// api.ts
import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000/api/todos';

// Fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error.message);
    // throw new Error('Failed to fetch todos');
  }
};

// Fetch a single todo by ID
export const fetchTodoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to fetch todo details');
  }
};

// Create a new todo
export const createTodo = async (newTodo: { title: string; description: string }) => {
  try {
    const response = await axios.post(API_URL, newTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to create todo');
  }
};

// Update a todo by ID
export const updateTodo = async (id: number, updatedTodo: { title: string; description: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to update todo');
  }
};

// Delete a todo by ID
export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Todo with id ${id} has been deleted.`);
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to delete todo');
  }
};
