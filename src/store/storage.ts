import type { User } from "./userSlice";

const USER_KEY = "user";

export const saveUserToStorage = (user: User) => {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (err) {
        console.error("Ошибка сохранения user в localStorage:", err);
    }
};

export const loadUserFromStorage = (): User | null => {
    try {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as User;
    } catch (err) {
        console.error("Ошибка загрузки user из localStorage:", err);
        return null;
    }
};

export const clearUserFromStorage = () => {
    try {
        localStorage.removeItem(USER_KEY);
    } catch (err) {
        console.error("Ошибка очистки user из localStorage:", err);
    }
};
