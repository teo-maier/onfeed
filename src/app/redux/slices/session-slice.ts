import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionSliceState {
  sessionTitle: string | null;
}

const initialState: SessionSliceState = {
  sessionTitle: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionTitle: (state, { payload }: PayloadAction<string>) => {
      state.sessionTitle = payload;
    },
  },
});

export const { setSessionTitle } = sessionSlice.actions;

export default sessionSlice.reducer;
