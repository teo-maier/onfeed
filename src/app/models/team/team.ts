export interface Team {
  id: number;
  teamName: string;
  members: Array<TeamMember>;
}

export interface BaseTeamMember {
  id: number;
  firstName: string;
  lastName: string;
}

export interface TeamMember extends BaseTeamMember {
  manager?: boolean;
}
