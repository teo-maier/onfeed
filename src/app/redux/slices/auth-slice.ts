import { UserRole } from '@onfeed/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthSliceState {
  isAuthenticated: boolean;
  role?: UserRole | null;
}

const initialState: AuthSliceState = {
  isAuthenticated: false,
  role: undefined,
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
  },
});

export const { setAuthenticated, setRole, login, logout } = authSlice.actions;

export default authSlice.reducer;
