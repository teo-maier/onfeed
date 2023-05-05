import { Accordion } from '@mantine/core';
import { Button } from '@onfeed/components';
import { ButtonVariant } from '@onfeed/helpers';
import { FormSliceState, RootState, setFormQuestions } from '@onfeed/redux';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ModalFormTemplate } from 'src/app/components/modal/modal';
import { ModalAccordion } from 'src/app/components/modal/modal-accordion';
import { FormQuestion } from 'src/app/models/form/form-question';
import { v4 as uuid } from 'uuid';
import styles from './form-page.module.scss';
import { Input as CustomInput } from '@onfeed/components';
import classnames from 'classnames';

const DemoAccordion = () => {
  const dispatch = useDispatch();

  const [nr, setNr] = useState<number>(0);

  const { formQuestions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const handleSave = (question: FormQuestion) => {
    dispatch(setFormQuestions(question));
  };

  console.log(formQuestions);

  return (
    <div className={styles['form-wrapper']}>
      <h6 className={styles['form-title']}>Create template</h6>
      <div className={styles['form-container']}>
        <ModalAccordion handleSave={handleSave} />
        <div className={styles['form-button-container']}>
          <Button
            fullWidth
            variant={ButtonVariant.GHOST}
            onClick={() => {
              setNr(nr + 1);
            }}
            icon={<IoAddOutline size={'18px'} />}
          >
            {'Add question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { DemoAccordion };
