import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

/**
 * Notification Context Provider
 * Provides global notification state management
 */
export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const id = Date.now();
        const newNotification = {
            id,
            type: 'info', // info, success, warning, error
            title: '',
            message: '',
            duration: 5000,
            ...notification,
        };
        
        setNotifications(prev => [...prev, newNotification]);
        
        if (newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
        }
        
        return id;
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const showSuccess = (message, title = 'Success') => {
        return addNotification({ type: 'success', title, message });
    };

    const showError = (message, title = 'Error') => {
        return addNotification({ type: 'error', title, message });
    };

    const showWarning = (message, title = 'Warning') => {
        return addNotification({ type: 'warning', title, message });
    };

    const showInfo = (message, title = 'Info') => {
        return addNotification({ type: 'info', title, message });
    };

    const value = {
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

/**
 * Hook to use notification context
 */
export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

export default NotificationContext;
