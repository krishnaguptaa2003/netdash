// src/services/notifications.js
export const fetchNotificationCount = async () => {
  try {
    const response = await fetch('/api/notifications/count');
    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error('Failed to fetch notifications', error);
    return 0;
  }
};