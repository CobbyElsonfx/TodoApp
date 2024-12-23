import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodos, fetchTodoById, createTodo, updateTodo, deleteTodo, Todo, TodoRequest } from "@/constants/api";

interface TodosState {
  todos: Todo[];
  currentTodo: Todo | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  currentTodo: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTodosThunk = createAsyncThunk("todos/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await fetchTodos();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchTodoByIdThunk = createAsyncThunk("todos/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    return await fetchTodoById(id);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createTodoThunk = createAsyncThunk(
  "todos/create",
  async (newTodo: TodoRequest, { rejectWithValue }) => {
    try {
      return await createTodo(newTodo);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/update",
  async ({ id, updatedTodo }: { id: number; updatedTodo: TodoRequest }, { rejectWithValue }) => {
    try {
      return await updateTodo(id, updatedTodo);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk("todos/delete", async (id: number, { rejectWithValue }) => {
  try {
    await deleteTodo(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Todos
    builder.addCase(fetchTodosThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todos = action.payload || [];
    });
    builder.addCase(fetchTodosThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Todo By ID
    builder.addCase(fetchTodoByIdThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.currentTodo = action.payload;
    });

    // Create Todo
    builder.addCase(createTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    });

    // Update Todo
    builder.addCase(updateTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });

    // Delete Todo
    builder.addCase(deleteTodoThunk.fulfilled, (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });

    // // Handle errors for all rejected actions
    // builder.addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   (state, action) => {
    //     state.error = action.payload as string;
    //     state.loading = false;
    //   }
    // );
  },
});

export default todosSlice.reducer;
