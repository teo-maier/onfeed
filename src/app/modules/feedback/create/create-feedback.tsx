import { FeedbackPropmt } from 'src/app/components/feedback';
import styles from './create-feedback.module.scss';

const CreateFeedback = () => {
  const handleBubbleRightClick = () => {
    console.log('right click');
  };

  return (
    <>
      <FeedbackPropmt />
    </>
  );
};

export { CreateFeedback };
