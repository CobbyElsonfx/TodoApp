import axios, { AxiosResponse } from 'axios';

// Define the base URL for the API
export const API_URL = 'https://63b3-41-215-163-178.ngrok-free.app/api/todos';

// Define the Todo interface to match the API response
export interface Todo {
  id: number;
  title: string;
  details: string; 
  status: string; 
  created_at: string; 
  updated_at: string; 
}

// Define a reusable type for creating or updating todos
export interface TodoRequest {
  title: string;
  details: string;
}

// Fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response: AxiosResponse<Todo[]> = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching todos:', error.message);
    throw new Error('Failed to fetch todos');
  }
};

// Fetch a single todo by ID
export const fetchTodoById = async (id: number): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching todo by ID:', error.message);
    throw new Error('Failed to fetch todo details');
  }
};

// Create a new todo
export const createTodo = async (newTodo: TodoRequest): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.post(API_URL, newTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating todo:', error.message);
    throw new Error('Failed to create todo');
  }
};

// Update a todo using its ID
export const updateTodo = async (
  id: number,
  updatedTodo: TodoRequest
): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.put(`${API_URL}/${id}`, updatedTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error updating todo:', error.message);
    throw new Error('Failed to update todo');
  }
};

// Delete a todo using its ID
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Todo with ID ${id} has been deleted.`);
  } catch (error: any) {
    console.error('Error deleting todo:', error.message);
    throw new Error('Failed to delete todo');
  }
};
