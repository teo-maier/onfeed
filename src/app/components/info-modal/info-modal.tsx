import styles from './info-modal.module.scss';
import { Input as CustomInput } from '../custom-input/custom-input';
import { InfoIcon } from '@onfeed/assets';
import classnames from 'classnames';
import { Textarea } from '@mantine/core';
import { Form, Question } from '@onfeed/models';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setForm } from '@onfeed/redux';

export interface InformationValues {
  title: string;
  description: string;
  tags: Array<string>;
}

interface InfoModalProps {
  form: Form | null;
  labelTitle: string;
  labelTextarea: string;
  labelTags: string;
  sendInfo: (values: InformationValues) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  form,
  labelTitle,
  labelTextarea,
  labelTags,
  sendInfo,
}) => {
  const [title, setTitle] = useState<string>(form ? form.title : '');
  const [description, setDescription] = useState<string>(
    form ? form.description : ''
  );
  const [tags, setTags] = useState<string>('');

  const tagsArray = tags.split(' ');

  useEffect(() => {
    if (title && description && tags.length > 0) {
      sendInfo({
        title: title,
        description: description,
        tags: tagsArray,
      });
    }
  }, [title, description, tags]);

  return (
    <div
      className={classnames(
        'button--secondary',
        styles['info-modal-container']
      )}
    >
      <div
        className={classnames('button--secondary', styles['info-modal-header'])}
      >
        <InfoIcon />
        Information
      </div>
      <div className={'horizontal-bar'}></div>

      <div className={styles['info-modal-content']}>
        <CustomInput
          className={classnames('button--secondary', styles['input-modal'])}
          placeholder={'Write your title here...'}
          value={form?.title}
          label={labelTitle}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Textarea
          w={'100%'}
          placeholder={'Write your description here...'}
          value={form?.description}
          label={labelTextarea}
          onChange={(event: any) => setDescription(event.target.value)}
        />
        <CustomInput
          className={classnames('button--secondary', styles['input-modal'])}
          placeholder={'Add tags...'}
          label={labelTags}
          onChange={(event) => setTags(event.target.value)}
        />
      </div>
    </div>
  );
};

export { InfoModal };
