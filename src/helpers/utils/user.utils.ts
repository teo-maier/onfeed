import { Employee, SessionRecipients, TeamMember } from '@onfeed/models';

type UserInitialsType = Pick<Employee | TeamMember, 'firstName' | 'lastName'>;

export const getUserInitials = (user: UserInitialsType): string => {
  return getFullUserName(user)
    .split(' ')
    .map((namePart) => namePart[0])
    .join('');
};

export const getFullUserName = (user: UserInitialsType): string => {
  if (!user) {
    return '';
  }
  const keys: (keyof UserInitialsType)[] = ['firstName', 'lastName'];
  return keys
    .reduce<string[]>((nameParts, key) => {
      if (user[key]) {
        return [...nameParts, user[key].toString()];
      }
      return nameParts;
    }, [])
    .join(' ');
};
