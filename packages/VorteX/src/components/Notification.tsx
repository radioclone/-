import React, { useState, useEffect } from 'react';

interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  dismissible: boolean;
}

export function Notification() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Example notification system - in production, this would be connected to a global state
  useEffect(() => {
    // Add sample notification
    const welcomeNotification: NotificationItem = {
      id: 'welcome',
      type: 'info',
      title: 'Welcome to VorteX',
      message: 'Your Web3 ecosystem is ready to use!',
      timestamp: new Date(),
      dismissible: true,
    };

    setNotifications([welcomeNotification]);

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setNotifications([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationStyles = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-800 border-green-600 text-green-100';
      case 'error':
        return 'bg-red-800 border-red-600 text-red-100';
      case 'warning':
        return 'bg-yellow-800 border-yellow-600 text-yellow-100';
      case 'info':
      default:
        return 'bg-blue-800 border-blue-600 text-blue-100';
    }
  };

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${getNotificationStyles(notification.type)}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-lg">{getNotificationIcon(notification.type)}</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="mt-1 text-sm opacity-90">{notification.message}</p>
              <p className="mt-1 text-xs opacity-75">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            {notification.dismissible && (
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
