export enum OptionType {
  TEXTAREA = 'TEXTAREA',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT',
  SINGLE_SELECT = 'SINGLE_SELECT',
  STAR = 'STAR',
  GRADE = 'GRADE',
  EMOJI = 'EMOJI',
}

export const OptionTypeLabel: Record<OptionType, string> = {
  [OptionType.TEXTAREA]: 'Textarea',
  [OptionType.MULTIPLE_SELECT]: 'Multiple select',
  [OptionType.SINGLE_SELECT]: 'Single select',
  [OptionType.STAR]: 'Star',
  [OptionType.GRADE]: 'Grade',
  [OptionType.EMOJI]: 'Emoji',
};
