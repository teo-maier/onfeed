import { UserRole } from "@onfeed/helpers";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: UserRole;
  active: boolean;
}
