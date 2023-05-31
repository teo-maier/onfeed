import { ONFEED_ROUTES } from '@onfeed/helpers';
import { Form } from '@onfeed/models';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Tab } from '../tab/tab';
import styles from './templates-side-menu.module.scss';
import tabStyle from './../tab/tab.module.scss';
import { useSelector } from 'react-redux';
import { FormSliceState, RootState } from '@onfeed/redux';

interface TemplatesSideMenuProps {
  isForFeedback: boolean;
  allForms: Form[];
  getFormId?: (id: string | undefined) => void;
  form?: Form;
}

const TemplatesSideMenu: React.FC<TemplatesSideMenuProps> = ({
  isForFeedback,
  getFormId,
  allForms,
  // form,
}) => {
  const { form: f } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [divValue, setDivValue] = useState<string>(f ? f.title : '');

  useEffect(() => {
    if (f) {
      setDivValue(f.title);
    }
  }, [f]);

  console.log(divValue);
  console.log(f);

  return (
    <div className={styles['side-menu-container']}>
      <Tab
        path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`}
        title="Form templates"
        icon={<IoAdd size="18px" className={styles['add-icon']} />}
      />
      <div className={'horizontal-bar'}></div>
      {allForms.map(({ title, id, description }) =>
        isForFeedback && getFormId ? (
          <div
            className={classnames(
              tabStyle['button'],
              { [tabStyle['button--active']]: divValue === title },
              ['button--secondary']
            )}
            onClick={(value) => {
              setDivValue(value.currentTarget.innerHTML);
              getFormId(id);
            }}
          >
            {title}
          </div>
        ) : (
          <Tab
            path={`${ONFEED_ROUTES.VIEW}/${id}`}
            title={title}
            description={description}
          />
        )
      )}
    </div>
  );
};

export { TemplatesSideMenu };
