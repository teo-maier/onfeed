import {
  Employee,
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
        if (
          !state.sessionRecipients.some((m) => m.employee.id === teamMember.id)
        ) {
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

    setSessionRecipientsOnEditMode: (
      state,
      { payload }: PayloadAction<SessionRecipients[]>
    ) => {
      state.sessionRecipients = payload;
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

    removeRecipient: (state, { payload }: PayloadAction<TeamMember | Employee>) => {
      const teamMember = state.sessionRecipients.find(
        (recipient) => recipient.employee.id === payload.id
      );
      if (teamMember) {
        const index = state.sessionRecipients.indexOf(teamMember);
        state.sessionRecipients.splice(index, 1);
      }
    },
  },
});

export const {
  setSessionTitle,
  setSessionRecipients,
  setSessionRecipientsOnEditMode,
  setAllSessions,
  setSessionRecipientsBySessionId,
  setSessionStatus,
  removeRecipient,
} = sessionSlice.actions;

export default sessionSlice.reducer;
