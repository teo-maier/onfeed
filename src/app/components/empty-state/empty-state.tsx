import classnames from 'classnames';
import { ReactNode } from 'react';
import styles from './empty-state.module.scss';

interface EmptyStateProps {
  isEmpty: boolean | null;
  children: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isEmpty, children }) => {
  return isEmpty ? (
    <div className={classnames(styles['empty-container'], 'caption')}>
      {children}
    </div>
  ) : null;
};

export { EmptyState };
