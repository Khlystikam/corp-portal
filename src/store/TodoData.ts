import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
	id: number;
	user_id: number;
	title: string;
	description: string;
	status: number;
}

interface CompletedTaskState {
	todos: Todo[];
	loading: boolean;
	error: string | null;
}

const initialState: CompletedTaskState = {
	todos: [],
	loading: false,
	error: null,
};

// загрузка с бэка
export const fetchCompletedTasks = createAsyncThunk<
	Todo[],
	number,
	{ rejectValue: string }
	>('todo/fetchCompletedTasks', async (userId, thunkAPI) => {
	try {
		const response = await fetch(
			`https://projects.dev-khlystikam.ru/projects/php/corp-portal/getTodoTasks.php?user_id=${userId}`
		);
		const data = await response.json();
		return data.data;
	} catch {
		return thunkAPI.rejectWithValue('Ошибка загрузки задач');
	}
});

// добавление новой задачи
export const addTodoAsync = createAsyncThunk<
	Todo,
	Omit<Todo, 'id'>, // на вход без id, он формируется в базе
	{ rejectValue: string }
	>('todo/addTodo', async (newTodo, thunkAPI) => {
	try {
		const response = await fetch(
			`https://projects.dev-khlystikam.ru/projects/php/corp-portal/addTodo.php`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTodo),
		}
		);
		const data = await response.json();
		return data; // сервер вернёт todo с id
	} catch {
		return thunkAPI.rejectWithValue('Ошибка добавления задачи');
	}
});

// удаление
export const removeTodoAsync = createAsyncThunk<
    number,
    { user_id: number; id: number },
    { rejectValue: string }
>(
    'todo/removeTodo',
    async ({ user_id, id }, thunkAPI) => {
        try {
            const response = await fetch(
                'https://projects.dev-khlystikam.ru/projects/php/corp-portal/deleteTodo.php',
                {
                    method: 'POST', // безопаснее использовать POST с телом JSON
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id, id }),
                }
            );

            const data = await response.json();
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message || 'Ошибка удаления задачи');
            }

            return id;
        } catch {
            return thunkAPI.rejectWithValue('Ошибка удаления задачи');
        }
    }
);


export const toggleTodoAsync = createAsyncThunk<
    Todo,
    { user_id: number; id: number },
    { rejectValue: string }
>(
    'todo/toggleTodo',
    async ({ user_id, id }, thunkAPI) => {
        try {
            const response = await fetch(
                'https://projects.dev-khlystikam.ru/projects/php/corp-portal/toggleTodo.php',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id, id }),
                }
            );
            const data = await response.json();
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message || 'Ошибка изменения задачи');
            }
            return data.data;
        } catch {
            return thunkAPI.rejectWithValue('Ошибка изменения задачи');
        }
    }
);

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		loadFromStorage(state, action: PayloadAction<Todo[]>) {
		state.todos = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
		// загрузка
		.addCase(fetchCompletedTasks.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(fetchCompletedTasks.fulfilled, (state, action) => {
			state.loading = false;
			state.todos = action.payload;
		})
		.addCase(fetchCompletedTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload ?? 'Неизвестная ошибка';
		})

		// добавление
		.addCase(addTodoAsync.fulfilled, (state, action) => {
			state.todos.push(action.payload);
		})

		// удаление
		.addCase(removeTodoAsync.fulfilled, (state, action) => {
			state.todos = state.todos.filter((t) => t.id !== action.payload);
		})

		// обновление статуса
		.addCase(toggleTodoAsync.fulfilled, (state, action) => {
			const idx = state.todos.findIndex((t) => t.id === action.payload.id);
			if (idx !== -1) {
			state.todos[idx] = action.payload;
			}
		});
	},
});

export const { loadFromStorage } = todoSlice.actions;
export default todoSlice.reducer;
