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
import { getEmptyIcon } from './emoji-empty-icon';
import { getFullIcon } from './emoji-full-icon';

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
  const [starValue, setStarValue] = useState(0);
  const [emojiValue, setEmojiValue] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange({ starValue: starValue, emojiValue: emojiValue });
    }
  }, [starValue, emojiValue]);

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
