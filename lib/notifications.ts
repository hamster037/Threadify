// OneSignal Push Notification Setup
// Requires react-native-onesignal and expo-dev-client

export const initializeNotifications = () => {
  try {
    const OneSignal = require('react-native-onesignal').default;
    const appId = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID;
    if (appId) {
      OneSignal.initialize(appId);
      OneSignal.Notifications.requestPermission(true);
    }
  } catch (error) {
    console.log('OneSignal not available (Expo Go):', error);
  }
};

export const setNotificationUserId = (userId: string) => {
  try {
    const OneSignal = require('react-native-onesignal').default;
    OneSignal.login(userId);
  } catch (error) {
    console.log('OneSignal setUserId error:', error);
  }
};
