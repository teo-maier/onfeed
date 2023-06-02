import { rem } from "@mantine/core";
import {
  EmojiFrown,
  EmojiAngry,
  EmojiNeutral,
  EmojiHeartEyes,
  EmojiSmile,
} from 'react-bootstrap-icons';

export const getEmptyIcon = (value: number) => {
    const defaultProps = { size: rem(24), color: 'gray' };
    switch (value) {
      case 1:
        return <EmojiAngry {...defaultProps} />;
      case 2:
        return <EmojiFrown {...defaultProps} />;
      case 3:
        return <EmojiNeutral {...defaultProps} />;
      case 4:
        return <EmojiSmile {...defaultProps} />;
      case 5:
        return <EmojiHeartEyes {...defaultProps} />;
    }
  };