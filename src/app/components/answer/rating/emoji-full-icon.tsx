import { rem, useMantineTheme } from '@mantine/core';
import {
    EmojiFrown,
    EmojiAngry,
    EmojiNeutral,
    EmojiHeartEyes,
    EmojiSmile,
  } from 'react-bootstrap-icons';

export const getFullIcon = (value: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useMantineTheme();

  const defaultProps = { size: rem(24) };

  switch (value) {
    case 1:
      return <EmojiAngry {...defaultProps} color={theme.colors.red[5]} />;
    case 2:
      return <EmojiFrown {...defaultProps} color={theme.colors.orange[1]} />;
    case 3:
      return <EmojiNeutral {...defaultProps} color={theme.colors.yellow[1]} />;
    case 4:
      return <EmojiSmile {...defaultProps} color={theme.colors.green[3]} />;
    case 5:
      return <EmojiHeartEyes {...defaultProps} color={theme.colors.green[5]} />;
  }
};
