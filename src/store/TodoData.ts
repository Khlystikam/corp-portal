import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const savedTodos = localStorage.getItem('todos');

const initialState: TodoState = {
    todos: savedTodos ? JSON.parse(savedTodos) : [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: {
        reducer(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload);
        },
        prepare(text: string) {
            return {
                payload: {
                    id: nanoid(),
                    text,
                    completed: false
                }
            };
        }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.todos.find(todo => todo.id === action.payload);
        if (todo) {
            todo.completed = !todo.completed;
        }
        },
        loadFromStorage(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
        }
    }
});

export const { addTodo, removeTodo, toggleTodo, loadFromStorage } = todoSlice.actions;
export default todoSlice.reducer;