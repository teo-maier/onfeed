import { Flex, Rating, rem } from '@mantine/core';
import { useState } from 'react';
import { BubbleNumberComponent } from '../../bubble-number/bubble-number';
import {
  EmojiFrown,
  EmojiAngry,
  EmojiNeutral,
  EmojiHeartEyes,
  EmojiSmile,
} from 'react-bootstrap-icons';
import { OptionTypeLabel } from '@onfeed/helpers';

interface RatingAnswerProps {
  ratingType: string;
}

// when a number is clicked, itself and the prev numbers will be colored blue
// indicating the desired grade given
const RatingAnswer: React.FC<RatingAnswerProps> = ({ ratingType }) => {
  const [value, setValue] = useState(0);

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

  console.log(ratingType);
  return (
    <Flex direction="row" gap="4px" style={{ alignSelf: 'center' }}>
      {ratingType === OptionTypeLabel.STAR && (
        // color on stars & they should be disabled !!!
        <Rating defaultValue={3} count={5} />
      )}
      {ratingType === OptionTypeLabel.EMOJI && (
        <Rating
          emptySymbol={getEmptyIcon}
          // fullSymbol={getFullIcon}
          highlightSelectedOnly
        />
      )}
    </Flex>
  );
};

export { RatingAnswer };
