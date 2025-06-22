import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const NotificationToast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`notification-toast ${type === 'error' ? 'message-error' : 'message-success'}`}>
            <CheckCircle size={24} />
            <span>{message}</span>
        </div>
    );
};

export default NotificationToast;