import { Flex, Rating, rem, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { BubbleNumberComponent } from '../../bubble-number/bubble-number';
import {
  EmojiFrown,
  EmojiAngry,
  EmojiNeutral,
  EmojiHeartEyes,
  EmojiSmile,
} from 'react-bootstrap-icons';
import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';

interface RatingAnswerProps {
  ratingType: AnswerTypeEnum;
  onChange?: (obj: { starValue: number; emojiValue: number }) => void;
}

// when a number is clicked, itself and the prev numbers will be colored blue
// indicating the desired grade given
const RatingAnswer: React.FC<RatingAnswerProps> = ({
  ratingType,
  onChange,
}) => {
  const theme = useMantineTheme();
  const [starValue, setStarValue] = useState(0);
  const [emojiValue, setEmojiValue] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange({ starValue: starValue, emojiValue: emojiValue });
    }
  }, [starValue, emojiValue]);

  const getEmptyIcon = (value: number) => {
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

  const getFullIcon = (value: number) => {
    const defaultProps = { size: rem(24) };

    switch (value) {
      case 1:
        return <EmojiAngry {...defaultProps} color={theme.colors.red[5]} />;
      case 2:
        return <EmojiFrown {...defaultProps} color={theme.colors.orange[1]} />;
      case 3:
        return (
          <EmojiNeutral {...defaultProps} color={theme.colors.yellow[1]} />
        );
      case 4:
        return <EmojiSmile {...defaultProps} color={theme.colors.green[3]} />;
      case 5:
        return (
          <EmojiHeartEyes {...defaultProps} color={theme.colors.green[5]} />
        );
    }
  };
  console.log(ratingType);

  return (
    <Flex mb="16px" style={{ alignSelf: 'center' }}>
      {ratingType === AnswerTypeEnum.STAR && (
        // color on stars & they should be disabled !!!
        <Rating
          onChange={setStarValue}
          value={starValue}
          color="#2351d4"
          size="24px"
        />
      )}
      {ratingType === AnswerTypeEnum.EMOJI && (
        <Rating
          emptySymbol={getEmptyIcon}
          fullSymbol={getFullIcon}
          highlightSelectedOnly
          value={emojiValue}
          onChange={setEmojiValue}
        />
      )}
    </Flex>
  );
};

export { RatingAnswer };
