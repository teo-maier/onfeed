import { Badge, createStyles, Flex, Table } from '@mantine/core';
import { BubbleNumberComponent, CustomBadge } from '@onfeed/components';
import { FeedbackStatusEnum, FeedbackStatusEnumLabel } from '@onfeed/helpers';
import classnames from 'classnames';
import styles from './feedback-table.module.scss';

const useStyles = createStyles(() => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
    fontSize: '12px',
  },
}));

const FeedbackPage = () => {
  const { classes } = useStyles();

  const elements = [
    {
      id: 1,
      title: 'Session title',
      results: {
        answered: 10,
        notAnswered: 14,
        total: 24,
      },
      status: 'IN_PROGRESS',
      date: '16/09/2023',
      isAnonymous: true,
    },
    {
      id: 2,
      title: 'Session title',
      results: {
        answered: 4,
        notAnswered: 4,
        total: 4,
      },
      status: 'COMPLETED',
      date: '11/11/2023',
      isAnonymous: true,
    },
    {
      id: 3,
      title: 'Session title',
      results: {
        answered: 8,
        notAnswered: 3,
        total: 11,
      },
      status: 'IN_PROGRESS',
      date: '09/05/2023',
      isAnonymous: true,
    },
    {
      id: 4,
      title: 'Session title',
      results: {
        answered: 2,
        notAnswered: 1,
        total: 3,
      },
      status: 'IN_PROGRESS',
      date: '22/03/2023',
      isAnonymous: false,
    },
    {
      id: 5,
      title: 'Session title',
      results: {
        answered: 2,
        notAnswered: 2,
        total: 2,
      },
      status: 'COMPLETED',
      date: '11/01/2023',
      isAnonymous: false,
    },
  ];

  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td className="body--secondary">{element.title}</td>
      <td className="body--secondary">
        <Flex justify="center" gap="8px">
          <BubbleNumberComponent
            value={element.results.answered}
            bubbleType={'answered'}
          />
          <BubbleNumberComponent
            value={element.results.notAnswered}
            bubbleType={'notAnswered'}
          />
          <BubbleNumberComponent
            value={element.results.total}
            bubbleType={'total'}
          />
        </Flex>
      </td>
      <td>
        <Flex justify="center">
          <Badge
            className={classnames('caption', styles['table-badge'], {
              [styles['table-badge--in-progress']]:
                element.status === FeedbackStatusEnum.IN_PROGRESS,
              [styles['table-badge--completed']]:
                element.status === FeedbackStatusEnum.COMPLETED,
            })}
            radius={8}
          >
            {FeedbackStatusEnumLabel[element.status as FeedbackStatusEnum]}
          </Badge>
        </Flex>
      </td>
      <td className="body--secondary">{element.date}</td>
      <td>
        <span
          className={classnames(styles['table-anon'], {
            [styles['table-anon--isAnon']]: element.isAnonymous,
          })}
        ></span>
      </td>
    </tr>
  ));

  return (
    <Flex justify={'center'}>
      <div className={classnames(styles['table-container'])}>
        <Table highlightOnHover verticalSpacing="12px">
          <thead>
            <tr>
              <th>Session title</th>
              <th>Results</th>
              <th>Status</th>
              <th>Date</th>
              <th>Anonymous</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </Flex>
  );
};

export { FeedbackPage };
