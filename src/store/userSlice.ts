import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface User {
	id: number;
	email: string;
	name: string;
	role: string;
}

export interface UserState {
	data: User | null;
	isAuth: boolean;
}

const loadUserFromStorage = (): User | null => {
	try {
		const raw = localStorage.getItem("user");
		return raw ? (JSON.parse(raw) as User) : null;
	} catch {
		return null;
	}
};

const initialUser = loadUserFromStorage();

const initialState: UserState = {
	data: initialUser,
	isAuth: !!initialUser,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.data = action.payload;
			state.isAuth = true;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		clearUser(state) {
			state.data = null;
			state.isAuth = false;
			localStorage.removeItem("user");
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;
export const selectUserName = (state: RootState) => state.user.data?.name;
export const selectIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;