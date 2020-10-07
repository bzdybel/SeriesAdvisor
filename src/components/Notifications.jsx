import { store } from 'react-notifications-component';

export const handleNotification = (message, type) => {
    store.addNotification({
        message: message,
        type: type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
            duration: 5000,
            onScreen: true,
        },
    });
};
