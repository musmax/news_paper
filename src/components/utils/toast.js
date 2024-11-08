import {toast} from 'react-toastify'


export const showToast = (type, message) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(message, {
                position: 'top-center',
            })
            break;
        case 'ERROR':
            toast.success(message, {
                position: 'top-left',
            })
            break;

        default:
            console.log('toast not available')
            break;
    }
}