import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CompletedTask {
	id: number;
	user_id: number;
	title: string;
	description: string;
	status: number;
	deadline: string;
	created_at: string;
}

interface CompletedTaskState {
	completedTasks: CompletedTask[];
	loading: boolean;
	error: string | null;
}

const initialState: CompletedTaskState = {
	completedTasks: [],
	loading: false,
	error: null,
};

// async для загрузки с бэка
export const fetchCompletedTasks = createAsyncThunk<
	CompletedTask[],
	number,
	{ rejectValue: string }
	>(
	"completedTask/fetchCompletedTasks",
	async (userId, thunkAPI) => {
		try {
			const response = await fetch(
				`https://projects.dev-khlystikam.ru/projects/php/corp-portal/getCompletedTasks.php?user_id=${userId}`
			);
			const data = await response.json();
			return data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue("Ошибка загрузки задач");
		}
	}
);

const completedTaskSlice = createSlice({
	name: "completedTask",
	initialState,
	reducers: {
		addCompletedTask(state, action: PayloadAction<CompletedTask>) {
			state.completedTasks.push(action.payload);
		},

		removeCompletedTask(state, action: PayloadAction<number>) {
			state.completedTasks = state.completedTasks.filter(
				(task) => task.id !== action.payload
			);
		},

		updateTaskStatus(
		state,
		action: PayloadAction<{ id: number; status: number }>
		) {
			const task = state.completedTasks.find(
				(task) => task.id === action.payload.id
			);
			if (task) {
				task.status = action.payload.status;
			}
		},

		loadFromStorage(state, action: PayloadAction<CompletedTask[]>) {
			state.completedTasks = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchCompletedTasks.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(fetchCompletedTasks.fulfilled, (state, action) => {
			state.loading = false;
			state.completedTasks = action.payload;
		})
		.addCase(fetchCompletedTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload || "Ошибка";
		});
	},
});

export const {
	addCompletedTask,
	removeCompletedTask,
	updateTaskStatus,
	loadFromStorage,
} = completedTaskSlice.actions;

export default completedTaskSlice.reducer;
