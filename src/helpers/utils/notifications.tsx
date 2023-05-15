import { showNotification } from '@mantine/notifications';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoWarning } from 'react-icons/io5';

export function showSuccessNotification(message: string) {
	return showNotification({
		title: 'Success!',
		message: message,
		styles: () => ({
			icon: { backgroundColor: '#72c221 !important' },
		}),
		style: {
			borderRadius: '12px',
			boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
			border: '0px',
		},
		icon: <IoCheckmarkCircle />,
	});
}

export function showInfoNotification(message: string) {
	return showNotification({
		title: 'Info',
		message: message,
		styles: () => ({
			icon: { backgroundColor: '#2351d4 !important' },
		}),
		style: {
			borderRadius: '12px',
			boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
			border: '0px',
		},
		icon: <IoInformationCircle />,
	});
}

export function showWarningNotification(message: string) {
	return showNotification({
		title: 'Warning!',
		message: message,
		styles: () => ({
			icon: { backgroundColor: '#f5d52c !important' },
		}),
		style: {
			borderRadius: '12px',
			boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
			border: '0px',
		},
		icon: <IoWarning />,
	});
}

export function showErrorNotification(message: string) {
	return showNotification({
		title: 'Error',
		message: message,
		styles: () => ({
			icon: { backgroundColor: '#f14f2b !important' },
		}),
		style: {
			borderRadius: '12px',
			boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
			border: '0px',
		},
		icon: <IoCloseCircle />,
	});
}
