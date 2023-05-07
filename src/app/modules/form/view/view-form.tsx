import { SLUG_KEY } from '@onfeed/helpers';
import { FormSliceState, RootState } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

interface ViewFormProps {
  value?: string;
}

const ViewForm: React.FC<ViewFormProps> = () => {
  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  return <>{formId}</>;
};

export { ViewForm };
