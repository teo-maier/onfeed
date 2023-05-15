import { MantineThemeOverride } from '@mantine/core';

export const themeOverrides: MantineThemeOverride = {
  fontFamily: 'Montserrat',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '24px',
    xl: '36px',
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '10px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },

  defaultRadius: 0,
  colors: {
    primary: [
      '#eff3fd',
      '#dde6ff',
      '#c6d5ff',
      '#4672ee',
      '#2351d4',
      '#143fbc',
      '#0a308b',
    ],
    secondary: [
      '#fff0dc',
      '#ffd8af',
      '#fec07f',
      '#fda64f',
      '#fb9630',
      '#e17304',
      '#af5a01',
      '#7e3f00',
      '#4d2500',
      '#1f0b00',
    ],
    greyscale: [
      '#ffffff',
      '#f9f9f9',
      '#f4f4f4',
      '#e9e9e9',
      '#d8d8d8',
      '#b8b8b8',
      '#909090',
      '#303136',
    ],
    notFound: ['#e9ecef', '#868e96'],
    success: ['#40c057'],
    error: ['#fa5252'],
  },

  primaryColor: 'primary',
  primaryShade: 4,
  components: {
    Textarea: {
      styles: (theme) => ({
        root: {},
        label: {
          color: `${theme.colors.greyscale[7]}`,
          fontSize: '12px',
          fontWeight: 600,
        },
        input: {
          fontWeight: 500,
          borderRadius: '12px',
          margin: '0 0 16px 0',
          // color does not work
          // color: `${theme.colors.greyscale[4]}`,
          border: `0.0625rem solid ${theme.colors.greyscale[4]}`,
          '&:hover': {
            border: `1px solid ${theme.colors.greyscale[6]}`,
          },
          '&:focus-visible': {
            border: `1px solid ${theme.colors.primary[4]}`,
          },
          '::placeholder': {
            color: `${theme.colors.greyscale[5]}`,
          },
        },
      }),
    },
    Chip: {
      styles: (theme) => ({
        iconWrapper: {
          color: `${theme.colors.primary[3]}`,
        },
        label: {
          '&[data-checked]:not([data-disabled])': {
            color: `${theme.colors.primary[3]}`,
          },
          '&:hover, &[data-checked]:not([data-disabled])': {
            backgroundColor: `${theme.colors.primary[0]}`,
          },
          '&[data-checked]:not([data-disabled]):hover': {
            backgroundColor: `${theme.colors.primary[0]}`,
            opacity: 0.8,
          },
          backgroundColor: `${theme.colors.greyscale[1]}`,
          fontFamily: 'Montserrat',
          fontSize: '12px',
        },
      }),
    },
    Stepper: {
      styles: (theme) => ({
        stepLabel: {
          fontFamily: 'Montserrat',
          fontSize: '12px',
          fontWeight: 600,
          lineHeight: '16px',
        },
        stepDescription: {
          fontFamily: 'Montserrat',
          fontSize: '10px',
          fontWeight: 600,
          lineHeight: '12px',
          color: `${theme.colors.greyscale[6]}`,
        },
        stepIcon: {
          '&[data-progress]': {
            borderColor: `${theme.colors.primary[4]}`,
          },
          '&[data-completed]': {
            borderColor: `${theme.colors.primary[4]}`,
            backgroundColor: `${theme.colors.primary[4]}`,
          },
          backgroundColor: `${theme.colors.primary[0]}`,
          border: `0.125rem solid ${theme.colors.primary[0]}`,
        },
        separatorActive: {
          backgroundColor: `${theme.colors.primary[4]}`,
        },
        separator: {
          backgroundColor: `${theme.colors.primary[2]}`,
          marginLeft: '60px',
          marginRight: '60px',
        },
      }),
    },
    ScrollArea: {
      styles: (theme) => ({
        thumb: {
          backgroundColor: `${theme.colors.greyscale[4]}`,
        },
        scrollbar: {
          '&:hover .___ref-thumb': {
            backgroundColor: `${theme.colors.greyscale[5]}`,
          },
        },
      }),
    },
    Switch: {
      styles: (theme) => ({
        label: {
          fontSize: '12px',
          clor: `${theme.colors.greyscale[7]}`,
        },
        track: {
          backgroundColor: `${theme.colors.greyscale[2]}`,
          borderColor: `${theme.colors.greyscale[3]}`,
          '&input:checked': {
            backgroundColor: `${theme.colors.primary[4]}`,
            borderColor: `${theme.colors.primary[4]}`,
          },
        },
        thumb: {
          border: `0.0625rem solid ${theme.colors.greyscale[4]}`,
        },
      }),
    },
    Table: {
      styles: (theme) => ({
        root: {
          'thead tr th': {
            fontWeight: 500,
            fontSize: '12px',
            textAlign: 'center',
          },
          'tbody tr td': {
            fontWeight: 500,
            fontSize: '12px',
            textAlign: 'center',
          },
          '&[data-hover] tbody tr:hover': {
            cursor: 'pointer',
            backgroundColor: `${theme.colors.greyscale[1]}`,
          },
        },
      }),
    },
  },

  globalStyles: (theme) => ({
    '.default-container': {
      backgroundColor: 'white',
      padding: '10px',
      border: '1px solid #dfdfdf',
      overflow: 'auto',
    },
  }),
};
