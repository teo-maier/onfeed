import classnames from 'classnames';
import { ReactNode } from 'react';
import styles from './drawer.module.scss';

interface DrawerProps {
  drawerOpened?: boolean;
  topOffset?: number;
  children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  drawerOpened,
  topOffset = 0,
  children,
}) => {
  return (
    <div
      className={classnames(styles['drawer'], {
        [styles['drawer--opened']]: drawerOpened,
      })}
      style={{ height: `calc(100% - ${topOffset}px)` }}
    >
      {children}
    </div>
  );
};

export { Drawer };
