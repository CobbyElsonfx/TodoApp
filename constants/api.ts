import axios, { AxiosResponse } from 'axios';

export const API_URL = 'https://63b3-41-215-163-178.ngrok-free.app/api/todos';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string; 
}

// Fetch all todos
export const fetchTodos = async (): Promise<Todo[] | undefined> => {
  try {
    const response: AxiosResponse<Todo[]> = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to fetch todos")

  }
};

// Fetch a single todo by ID
export const fetchTodoById = async (id: number): Promise<Todo | null> => {
  try {
    const response: AxiosResponse<Todo> = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error('Failed to fetch todo details');
  }
};

// Create a new todo ..
export const createTodo = async (newTodo: { title: string; description: string }): Promise<Todo | undefined> => {
  try {
    const response: AxiosResponse<Todo> = await axios.post(API_URL, newTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error('Failed to create todo');
  }
};

// update a using it ID
export const updateTodo = async (
  id: number,
  updatedTodo: { title: string; description: string }
): Promise<Todo | undefined> => {
  try {
    const response: AxiosResponse<Todo> = await axios.put(`${API_URL}/${id}`, updatedTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error('Failed to update todo');
  }
};

// Delete a todo using it Id
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Todo with id ${id} has been deleted.`);
  } catch (error: any) {
    console.error(error.message);
    throw new Error('Failed to delete todo');
  }
};
