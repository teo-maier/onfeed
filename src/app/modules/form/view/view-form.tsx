import { Button } from '@onfeed/components';
import { ButtonSize, ButtonVariant, ONFEED_ROUTES, SLUG_KEY } from '@onfeed/helpers';
import { Form } from '@onfeed/models';
import { FormSliceState, RootState } from '@onfeed/redux';
import { formAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { TemplatesSideMenu } from 'src/app/components/templates-side-menu/templates-side-menu';
import styles from './view-form.module.scss';


const ViewForm: React.FC = () => {
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState<Form[]>([]);

  useEffect(() => {
    formAPI.getAll().then((forms) => setAllForms(forms));
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
    {allForms.length > 0 ? (
      <div className={styles['view-form-container']}>
      <TemplatesSideMenu isForFeedback={false} allForms={allForms}/>
      <Outlet />
    </div>
      ) : (
        <div className={classnames(styles['empty-container'])}>
          <h6 className={classnames(styles['empty-text'])}>
            No templates created yet
          </h6>
          <Button
            className="button--secondary"
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.COMPACT}
            onClick={() => {
              navigate(`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`);
            }}
            icon={<IoAdd />}
          ></Button>
        </div>
      )}
    </>
  );
};

export { ViewForm };
