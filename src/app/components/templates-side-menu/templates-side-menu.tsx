import { ONFEED_ROUTES } from '@onfeed/helpers';
import { Form } from '@onfeed/models';
import { formAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Tab } from '../tab/tab';
import styles from './templates-side-menu.module.scss';
import tabStyle from './../tab/tab.module.scss';

interface TemplatesSideMenuProps {
  isForFeedback: boolean;
  getFormId?: (id: string | undefined) => void;
}

const TemplatesSideMenu: React.FC<TemplatesSideMenuProps> = ({
  isForFeedback,
  getFormId,
}) => {
  const [allForms, setAllForms] = useState<Form[]>([]);
  const [divValue, setDivValue] = useState<string>('');
  const [formId, setFormId] = useState<string>();

  useEffect(() => {
    formAPI.getAll().then((forms) => setAllForms(forms));
  }, []);

  return (
    <div className={styles['side-menu-container']}>
      <Tab
        path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`}
        title="Form templates"
        icon={<IoAdd size="18px" className={styles['add-icon']} />}
      />
      <div className={'horizontal-bar'}></div>
      {allForms.length > 0 ? (
        allForms.map(({ title, id, description }) =>
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
        )
      ) : (
        <div
          className={classnames(['button--secondary'], styles['empty-state'])}
        >
          No templates created
        </div>
      )}
    </div>
  );
};

export { TemplatesSideMenu };
