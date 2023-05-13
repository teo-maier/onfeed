export enum FeedbackStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export const FeedbackStatusEnumLabel: Record<FeedbackStatusEnum, string> = {
  [FeedbackStatusEnum.IN_PROGRESS]: 'In progress',
  [FeedbackStatusEnum.COMPLETED]: 'Completed',
};
