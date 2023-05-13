import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './slices';
import { apiSlice } from './slices/api-slice';
import { authSlice } from './slices/auth-slice';
import { teamSlice } from './slices/team-slice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [employeeSlice.name]: employeeSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [formSlice.name]: formSlice.reducer,
    [teamSlice.name]: teamSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
