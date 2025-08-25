import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoData';
import completedTaskReducer from './CompletedTasksData';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        completedTask: completedTaskReducer
    }
});

// сохраняем при каждом изменении
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('todos', JSON.stringify(state.todo.todos));
    localStorage.setItem('completedTasks', JSON.stringify(state.completedTask.completedTasks));
    localStorage.removeItem('completedTasks');
});

// Типы для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;