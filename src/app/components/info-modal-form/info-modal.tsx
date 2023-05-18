import styles from './info-modal.module.scss';
import { Input as CustomInput } from '../custom-input/custom-input';
import { InfoIcon } from '@onfeed/assets';
import classnames from 'classnames';
import { Flex, Switch, Textarea } from '@mantine/core';
import { Form, Question } from '@onfeed/models';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, SessionSliceState, setForm } from '@onfeed/redux';
import { SLUG_KEY } from '@onfeed/helpers';
import { useParams } from 'react-router-dom';

export interface InformationValues {
  title: string;
  description: string;
  tags?: Array<string>;
  anonChecked?: boolean;
  suggestionChecked?: boolean;
}

interface InfoModalProps {
  form?: Form | null;
  labelTitle: string;
  labelTextarea: string;
  labelTags: string | null;
  sendInfo: (values: InformationValues) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  form,
  labelTitle,
  labelTextarea,
  labelTags,
  sendInfo,
}) => {
  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();

  const { sessionTitle } = useSelector<RootState, SessionSliceState>(
    (state) => state.session
  );

  const [title, setTitle] = useState<string>(form ? form.title : '');
  const [description, setDescription] = useState<string>(
    form ? form.description : ''
  );
  const [tags, setTags] = useState<string>('');
  const [anonChecked, setAnonChecked] = useState<boolean>(false);
  const [suggestionChecked, setSuggestionChecked] = useState<boolean>(false);

  const tagsArray = tags.split(' ');

  useEffect(() => {
    if (title && description && tags.length > 0) {
      sendInfo({
        title: title,
        description: description,
        tags: tagsArray,
      });
    }
    if (!form && (sessionTitle || title) && description) {
      sendInfo({
        title: sessionTitle || title,
        description: description,
        anonChecked: anonChecked,
        suggestionChecked: suggestionChecked,
      });
    }
  }, [title, description, tags, anonChecked, suggestionChecked]);

  useEffect(() => {
    setAnonChecked(anonChecked);
    setSuggestionChecked(suggestionChecked);
  }, [anonChecked, suggestionChecked]);

  return (
    <div
      className={classnames(
        'button--secondary',
        styles['info-modal-container'],
        { [styles['info-modal-container--feedback']]: !form }
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
          value={sessionTitle ? title : form?.title}
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
        {form !== null ? (
          <Flex direction={'column'} gap="16px">
            <Switch
              label="Anonymous feedback"
              onChange={(event) => setAnonChecked(event.currentTarget.checked)}
            />
            <Switch
              label="Ask for suggestions"
              onChange={(event) =>
                setSuggestionChecked(event.currentTarget.checked)
              }
            />
          </Flex>
        ) : (
          <CustomInput
            className={classnames('button--secondary', styles['input-modal'])}
            placeholder={'Add tags...'}
            label={labelTags}
            onChange={(event) => setTags(event.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export { InfoModal };
