import { BubbleButton } from '@onfeed/components';
import { ModalAnswer } from 'src/app/components/answer/modal/modal-answer';

interface PreviewFormProps {
  value?: string;
}

const PreviewForm: React.FC<PreviewFormProps> = () => {
  const handleBubbleClick = () => {
    // callback function to return to previous page
    console.log('bubble click');
  };
  return (
    <>
      <ModalAnswer />
      <BubbleButton position="right" onClick={handleBubbleClick} />
      <BubbleButton position="left" onClick={handleBubbleClick} />
    </>
  );
};

export { PreviewForm };
