import {
  Session,
  SessionRecipients,
  SessionResults,
  SessionStatus,
  TeamMember,
} from '@onfeed/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionSliceState {
  sessionTitle: string | null;
  allSessions: Session[];
  sessionRecipients: SessionRecipients[];
  sessionRecipientsBySessionId: SessionRecipients[];
  sessionStatusArray: SessionStatus[];
}

const initialState: SessionSliceState = {
  sessionTitle: null,
  allSessions: [],
  sessionRecipients: [],
  sessionRecipientsBySessionId: [],
  sessionStatusArray: [],
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionTitle: (state, { payload }: PayloadAction<string>) => {
      state.sessionTitle = payload;
    },
    setAllSessions: (state, { payload }: PayloadAction<Session[]>) => {
      state.allSessions = payload;
    },
    setSessionRecipients: (state, { payload }: PayloadAction<TeamMember[]>) => {
      payload.forEach((teamMember) => {
        if (!state.sessionRecipients.some((m) => m.employee.id === teamMember.id)) {
          state.sessionRecipients = [
            ...state.sessionRecipients,
            {
              employee: teamMember,
              completed: false,
            },
          ];
        }
      });
    },
    setSessionRecipientsBySessionId: (
      state,
      { payload }: PayloadAction<SessionRecipients[]>
    ) => {
      state.sessionRecipientsBySessionId = payload;
    },
    setSessionStatus: (state, { payload }: PayloadAction<SessionStatus>) => {
      state.sessionStatusArray = [...state.sessionStatusArray, payload];
    },
  },
});

export const {
  setSessionTitle,
  setSessionRecipients,
  setAllSessions,
  setSessionRecipientsBySessionId,
  setSessionStatus,
} = sessionSlice.actions;

export default sessionSlice.reducer;
