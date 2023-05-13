import { SLUG_KEY } from '@onfeed/helpers';
import { FormSliceState, RootState } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { TemplatesSideMenu } from 'src/app/components/templates-side-menu/templates-side-menu';
import styles from './view-form.module.scss';

interface ViewFormProps {
  value?: string;
}

const ViewForm: React.FC<ViewFormProps> = () => {
  return (
    <div className={styles['view-form-container']}>
      <TemplatesSideMenu isForFeedback={false} />
      <Outlet />
    </div>
  );
};

export { ViewForm };
