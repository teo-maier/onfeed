import { Team, TeamMember } from '@onfeed/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamSliceState {
  selectedTeam: Team | null;
  selectedTeamMembers: TeamMember[];
  alreadySelected: boolean;
}

const initialState: TeamSliceState = {
  selectedTeam: null,
  selectedTeamMembers: [],
  alreadySelected: false,
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setSelectedTeam: (state, { payload }: PayloadAction<Team | null>) => {
      state.selectedTeam = payload;
    },
    setSelectedTeamMember: (state, { payload }: PayloadAction<TeamMember>) => {
      if (!state.selectedTeamMembers.some((m) => m.id === payload.id)) {
        state.selectedTeamMembers = [...state.selectedTeamMembers, payload];
        state.alreadySelected = false;
      } else {
        console.log('ALO')
        state.alreadySelected = true;
      }
    },
    resetAlreadySelected: (state) => {
      state.alreadySelected = false;
    },
    setAllMembers: (state, { payload }: PayloadAction<TeamMember[]>) => {
      state.selectedTeamMembers = payload;
    },
    removeTeamMember: (state, { payload }: PayloadAction<TeamMember>) => {
      const teamMember = state.selectedTeamMembers.find(
        (q) => q.id === payload.id
      );
      if (teamMember) {
        const index = state.selectedTeamMembers.indexOf(teamMember);
        state.selectedTeamMembers.splice(index, 1);
      }
    },
  },
});

export const {
  setSelectedTeam,
  setSelectedTeamMember,
  setAllMembers,
  removeTeamMember,
  resetAlreadySelected,
} = teamSlice.actions;

export default teamSlice.reducer;
