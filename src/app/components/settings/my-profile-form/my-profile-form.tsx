import { Employee } from '@onfeed/models';
import classnames from 'classnames';
import { Form } from '../../custom-form/custom-form';
import styles from './my-profile-form.module.scss';

interface MyProfileFormProps {
  formTitle: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  employee: Employee;
  onSubmit: (employee: Employee) => void;
}

const MyProfileForm: React.FC<MyProfileFormProps> = ({
  formTitle,
  subTitle,
  employee,
  onSubmit,
}) => {

  const handleSubmit = (e: Employee) => {
    onSubmit(e);
  };

  return (
    <>
      <div className={styles['profile-header']}>
        <h6 style={{ margin: 0 }}>{formTitle}</h6>
      </div>
      {subTitle ? (
        <span
          className={classnames(styles['profile-header--subtitle'], 'caption')}
        >
          {subTitle}
        </span>
      ) : null}
      <Form
        defaultValues={employee}
        onSubmit={handleSubmit}
        buttonText="Save"
        fields={[
          {
            name: 'firstName',
            type: 'text',
            label: 'First name',
            config: {
              required: { value: true, message: 'Required field' },
            },
          },
          {
            name: 'lastName',
            type: 'text',
            label: 'Last name',
            config: {
              required: { value: true, message: 'Required field' },
            },
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            disabled: true,
            config: {
              required: { value: true, message: 'Required field' },
            },
          },
        ]}
      />
    </>
  );
};

export { MyProfileForm };
