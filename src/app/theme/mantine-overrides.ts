import { MantineThemeOverride } from '@mantine/core';

export const themeOverrides: MantineThemeOverride = {
  // fontFamily: 'Montserrat',
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
      '#e4f3ff',
      '#c0daf1',
      '#9cc0e3',
      '#76a6d4',
      '#3b79b6',
      '#3873ad',
      '#2a5a88',
      '#1b4062',
      '#0c263e',
      '#000e1b',
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
    grayscale: [
      '#ffffff',
      '#d9d9d9',
      '#bfbfbf',
      '#a6a6a6',
      '#8c8c8c',
      '#737373',
      '#595959',
      '#404040',
      '#262626',
      '#0d0d0d',
    ],
    notFound: ['#e9ecef', '#868e96'],
    success: ['#40c057'],
    error: ['#fa5252'],
  },

  primaryColor: 'primary',
  primaryShade: 4,
  components: {},

  globalStyles: (theme) => ({
    '.default-container': {
      backgroundColor: 'white',
      padding: '10px',
      border: '1px solid #dfdfdf',
      overflow: 'auto',
    },
  }),
};
