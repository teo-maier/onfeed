import { Employee, Password } from '@onfeed/models';
import { useState } from 'react';
import { Form } from '../../custom-form/custom-form';
import styles from './password-form.module.scss';

interface PasswordFormProps {
  formTitle: string | React.ReactNode;
  employee?: Employee;
  onSubmit: (password: Password) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  formTitle,
  employee,
  onSubmit,
}) => {
  const [formPayload, setFormPayload] = useState<Password>({
    password: '',
    newPassword: '',
  });

  const handleSubmit = (password: Password) => {
    onSubmit({
      password: password.password,
      newPassword: password.newPassword,
    });
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-content']}>
        <div className={styles['form-header']}>
          <h6 style={{ margin: 0 }}>{formTitle}</h6>
        </div>
        <Form
          clearOnSubmit
          inlineActions
          onSubmit={handleSubmit}
          buttonText="Save"
          watchCallback={(data) => setFormPayload(data)}
          fields={[
            {
              name: 'password',
              type: 'password',
              label: 'Current password',
              placeholder: 'Enter your current password',
              config: {
                required: { value: true, message: 'Required field' },
              },
            },
            {
              name: 'newPassword',
              type: 'password',
              label: 'New password',
              placeholder: 'Enter your new password',
              config: {
                required: { value: true, message: 'Required field' },
              },
            },
            {
              name: 'confirmPassword',
              type: 'password',
              label: 'Confirm password',
              placeholder: 'Confirm your new password',
              config: {
                required: { value: true, message: 'Required field' },
                validate: (value) =>
                  value === formPayload.newPassword ||
                  'The passwords do not match',
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export { PasswordForm };
