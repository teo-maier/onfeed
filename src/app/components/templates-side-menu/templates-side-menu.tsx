import { ONFEED_ROUTES } from '@onfeed/helpers';
import { IoAdd, IoAddOutline } from 'react-icons/io5';
import { Tab } from '../tab/tab';
import styles from './templates-side-menu.module.scss';

const TemplatesSideMenu: React.FC = () => {
  const mockData = [
    {
      id: '1',
      title: 'Organizational Relfection',
    },
    {
      id: '2',
      title: 'Individul Relfection',
    },
    {
      id: '3',
      title: 'Satisfaction Relfection',
    },
  ];

  return (
    <div className={styles['side-menu-container']}>
      <Tab
        path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`}
        text="Form templates"
        icon={<IoAdd size="18px" className={styles['add-icon']}/>}
      />
      <div className={'horizontal-bar'}></div>
      {mockData.map(({ title, id }) => (
        <Tab path={`${ONFEED_ROUTES.VIEW}/${id}`} text={title} />
      ))}
    </div>
  );
};

export { TemplatesSideMenu };
