export enum AnswerTypeEnum {
  NONE = 'NONE',
  TEXTAREA = 'TEXTAREA',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT',
  SINGLE_SELECT = 'SINGLE_SELECT',
  STAR = 'STAR',
  EMOJI = 'EMOJI',
}

export const AnswerTypeEnumLabel: Record<AnswerTypeEnum, string> = {
  [AnswerTypeEnum.NONE]: '',
  [AnswerTypeEnum.TEXTAREA]: 'Textarea',
  [AnswerTypeEnum.MULTIPLE_SELECT]: 'Multiple select',
  [AnswerTypeEnum.SINGLE_SELECT]: 'Single select',
  [AnswerTypeEnum.STAR]: 'Star',
  [AnswerTypeEnum.EMOJI]: 'Emoji',
};
