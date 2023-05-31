// import { createStyles, Flex, Popover } from '@mantine/core';
// import { useClickOutside, useDisclosure } from '@mantine/hooks';
// import { ButtonSize, ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
// import { Session } from '@onfeed/models';
// import {
//   AuthSliceState,
//   RootState,
//   SessionSliceState,
//   setAllMembers,
//   setSelectedTeamMember,
//   setSessionRecipients,
//   setSessionTitle,
// } from '@onfeed/redux';
// import { sessionAPI } from '@onfeed/services';
// import classnames from 'classnames';
// import { useEffect, useState } from 'react';
// import { IoAdd } from 'react-icons/io5';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../button/button';
// import styles from './header-popover.module.scss';

// const useStyles = createStyles((theme) => ({
//   dropdown: {
//     borderRadius: '12px',
//     boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
//     width: '200px',
//     border: 'none',
//     padding: '16px',
//   },
// }));

// interface HeaderPopoverProps {
//   children?: React.ReactNode;
// }
// const HeaderPopover: React.FC<HeaderPopoverProps> = ({ children }) => {
//   const { classes } = useStyles();

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   // const { loggedInUser } = useSelector<RootState, AuthSliceState>(
//   //   (state) => state.auth
//   // );

//   const { allSessions } = useSelector<RootState, SessionSliceState>(
//     (state) => state.session
//   );

//   // const [allDrafts, setAllDrafts] = useState<Session[]>();

//   const [opened, { close, open }] = useDisclosure(false);
//   const ref = useClickOutside(() => close());

//   // useEffect(() => {
//   //   if (loggedInUser) {
//   //     sessionAPI.getAllDrafts(loggedInUser?.id).then((drafts) => {
//   //       setAllDrafts(drafts);
//   //     });
//   //     //here
//   //   }
//   // }, [loggedInUser, allSessions]);

//   return (
//     <Popover
//       classNames={classes}
//       opened={opened}
//       position="bottom-end"
//       shadow="md"
//     >
//       <Popover.Target>
//         <div ref={ref} onClick={open}>
//           {children}
//         </div>
//       </Popover.Target>
//       <Popover.Dropdown>
//         <Flex direction="column" gap="16px">
//           {allDrafts ? (
//             allDrafts.map((session) => (
//               <Button
//                 fullWidth
//                 className="button--secondary"
//                 variant={ButtonVariant.GHOST}
//                 size={ButtonSize.COMPACT}
//                 onClick={() => {
//                   dispatch(setSessionTitle(session.title!));
//                   navigate(
//                     `${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.EDIT}/${session.id}`
//                   );
//                 }}
//                 style={{ justifyContent: 'flex-start' }}
//               >
//                 {session.title}
//               </Button>
//             ))
//           ) : (
//             <div
//               className={classnames('button--secondary', styles['empty-state'])}
//             >
//               No drafts
//             </div>
//           )}
//           <div className="horizontal-bar" style={{ margin: '0' }}></div>
//           <Button
//             className="button--secondary"
//             variant={ButtonVariant.SECONDARY}
//             size={ButtonSize.COMPACT}
//             // change to navigate to create feedback teams first step
//             onClick={() => {
//               dispatch(setAllMembers([]));
//               dispatch(setSessionRecipients([]));
//               navigate(`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.NEW}`);
//             }}
//             icon={<IoAdd />}
//           >
//             New session
//           </Button>
//         </Flex>
//       </Popover.Dropdown>
//     </Popover>
//   );
// };

// export { HeaderPopover };
