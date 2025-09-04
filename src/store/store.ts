import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './TodoData';
import completedTaskReducer from './CompletedTasksData';
import userReducer from './userSlice';

const preloadedState = (() => {
    try {
        const raw = localStorage.getItem('user');
        if (!raw) return undefined;
        const user = JSON.parse(raw);
        return {
        user: {
            data: user,
            isAuth: true,
        },
        };
    } catch {
        return undefined;
    }
})();

export const store = configureStore({
    reducer: {
        todo: todoSlice,
        completedTask: completedTaskReducer,
        user: userReducer,
    },
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
