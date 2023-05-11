import { ActionIcon, Badge, CloseButton, Grid } from '@mantine/core';
import { removeOption } from '@onfeed/redux';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import styles from './badge.module.scss';

interface BadgeProps {
  value: string;
  removeValue: (value: string) => void;
}

const CustomBadge: React.FC<BadgeProps> = ({ value, removeValue }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleOnClick = () => {
    if (ref.current) {
      removeValue(value);
    }
  };

  return (
    <Grid.Col span={'content'}>
      <Badge
        className={styles['badge-container']}
        size={'md'}
        variant="light"
        radius={4}
        pr={4}
        rightSection={
          <ActionIcon
            ref={ref}
            title={value}
            size="xs"
            color="blue"
            radius="xl"
            variant="transparent"
            onClick={handleOnClick}
          >
            <CloseButton iconSize={'12px'} variant="transparent" />
          </ActionIcon>
        }
      >
        {value.toLocaleLowerCase()}
      </Badge>
    </Grid.Col>
  );
};

export { CustomBadge };
