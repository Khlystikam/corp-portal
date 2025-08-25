import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CompletedTask {
    id: string;
    text: string;
    completed: boolean;
}

interface completedTaskstate {
    completedTasks: CompletedTask[];
}

const savedCompletedTasks = localStorage.getItem('completedTasks');

const initialState: completedTaskstate = {
    completedTasks: savedCompletedTasks
        ? JSON.parse(savedCompletedTasks)
        : [
            { id: nanoid(), text: 'Закончить проект', completed: true },
            { id: nanoid(), text: 'Сделать отчет за неделю', completed: false },
            { id: nanoid(), text: 'Дать фидбэк по api', completed: true },
            { id: nanoid(), text: 'Просмотреть данные за месяц', completed: false },
            { id: nanoid(), text: 'Обновить документацию по проекту', completed: false },
            { id: nanoid(), text: 'Провести тестирование новой версии', completed: true },
            { id: nanoid(), text: 'Собрать статистику по пользователям', completed: false },
            { id: nanoid(), text: 'Запланировать встречу с командой', completed: true },
            { id: nanoid(), text: 'Проверить корректность API-ответов', completed: false },
            { id: nanoid(), text: 'Подготовить презентацию для клиента', completed: true },
            { id: nanoid(), text: 'Обновить данные в CRM', completed: false },
            { id: nanoid(), text: 'Написать отчёт по выполненным задачам за месяц', completed: false },
        ],
};

const completedTaskSlice = createSlice({
    name: 'completedTask',
    initialState,
    reducers: {
        statusCompletedTaskSlice: {
            reducer(state, action: PayloadAction<CompletedTask>) {
                state.completedTasks.push(action.payload);
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
        
        removeCompletedTaskSlice(state, action: PayloadAction<string>) {
            state.completedTasks = state.completedTasks.filter(completedTaskstate => completedTaskstate.id !== action.payload);
        },

        togglecompletedTaskSlice(state, action: PayloadAction<string>) {
            const todo = state.completedTasks.find(completedTaskstate => completedTaskstate.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        loadFromStorage(state, action: PayloadAction<CompletedTask[]>) {
            state.completedTasks = action.payload;
        }
    }
});

export const { statusCompletedTaskSlice, removeCompletedTaskSlice, togglecompletedTaskSlice, loadFromStorage } = completedTaskSlice.actions;
export default completedTaskSlice.reducer;