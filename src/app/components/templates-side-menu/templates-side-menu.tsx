import { Accordion } from '@mantine/core';
import { ONFEED_ROUTES } from '@onfeed/helpers';
import classnames from 'classnames';
import { IoAdd, IoAddOutline } from 'react-icons/io5';
import { Tab } from '../tab/tab';
import styles from './templates-side-menu.module.scss';

const TemplatesSideMenu: React.FC = () => {
  const mockData = [
    {
      id: '1',
      title: 'Organizational Relfection',
      description: 'ksejbfksbfosejnf weojndowejnf weofnweojfn',
    },
    {
      id: '2',
      title: 'Individul Relfection',
      description: 'ksejbfksbfosejnf weojndowejnf weofnweojfn',
    },
    {
      id: '3',
      title: 'Satisfaction Relfection',
      description: 'ksejbfksbfosejnf weojndowejnf weofnweojfn',
    },
  ];

  return (
    <div className={styles['side-menu-container']}>
      <Tab
        path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`}
        title="Form templates"
        icon={<IoAdd size="18px" className={styles['add-icon']} />}
      />
      <div className={'horizontal-bar'}></div>
      {mockData.length > 0 ? (
          mockData.map(({ title, id, description }) => (
            <Tab
              path={`${ONFEED_ROUTES.VIEW}/${id}`}
              title={title}
              description={description}
            />
          ))
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
