import { UserRole } from '@onfeed/helpers';
import { Employee } from '@onfeed/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthSliceState {
  isAuthenticated: boolean;
  role?: UserRole | null;
  loggedInUser?: Employee | null;
}

const initialState: AuthSliceState = {
  isAuthenticated: false,
  role: undefined,
  loggedInUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
    setRole: (state, { payload }: PayloadAction<UserRole | null>) => {
      state.role = payload;
    },
    login: (state, { payload }: PayloadAction<AuthSliceState>) => {
      state.role = payload.role;
      state.isAuthenticated = payload.isAuthenticated;
    },
    logout: (state) => {
      state.role = undefined;
      state.isAuthenticated = false;
    },
    setLoggedInUser: (state, { payload }: PayloadAction<Employee>) => {
      state.loggedInUser = payload;
    },
  },
});

export const { setAuthenticated, setRole, login, logout, setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
