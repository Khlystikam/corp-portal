import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CompletedTask {
    id: string;
    text: string;
    completed: boolean;
    author?: string;
    date?: string;
}
interface completedTaskstate {
    completedTasks: CompletedTask[];
}

const savedCompletedTasks = localStorage.getItem('completedTasks');

const initialState: completedTaskstate = {
    completedTasks: savedCompletedTasks
        ? JSON.parse(savedCompletedTasks)
        : [
            { id: nanoid(), text: 'Закончить проект', completed: true, author: "Солик Михаил", date: "02.08.25" },
            { id: nanoid(), text: 'Сделать отчет за неделю', completed: false, author: "Сергиенко Виталий", date: "05.08.25" },
            { id: nanoid(), text: 'Дать фидбэк по api', completed: true, author: "Иванов Андрей", date: "07.08.25" },
            { id: nanoid(), text: 'Просмотреть данные за месяц', completed: false, author: "Коваленко Дарья", date: "08.08.25" },
            { id: nanoid(), text: 'Обновить документацию по проекту', completed: false, author: "Лебедев Артём", date: "09.08.25" },
            { id: nanoid(), text: 'Провести тестирование новой версии', completed: true, author: "Фролова Марина", date: "10.08.25" },
            { id: nanoid(), text: 'Собрать статистику по пользователям', completed: false, author: "Савченко Павел", date: "11.08.25" },
            { id: nanoid(), text: 'Запланировать встречу с командой', completed: true, author: "Рыбакова Алина", date: "12.08.25" },
            { id: nanoid(), text: 'Проверить корректность API-ответов', completed: false, author: "Орлов Денис", date: "13.08.25" },
            { id: nanoid(), text: 'Подготовить презентацию для клиента', completed: true, author: "Сидоренко Игорь", date: "14.08.25" },
            { id: nanoid(), text: 'Обновить данные в CRM', completed: false, author: "Гончарова Ольга", date: "15.08.25" },
            { id: nanoid(), text: 'Написать отчёт по выполненным задачам за месяц', completed: false, author: "Мельник Виктор", date: "16.08.25" },
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
            prepare(text: string, author: string, date: string) {
                return {
                    payload: {
                        id: nanoid(),
                        text,
                        completed: false,
                        author,
                        date
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