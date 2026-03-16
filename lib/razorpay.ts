import { Alert } from 'react-native';

interface RazorpayOptions {
  description: string;
  currency: string;
  key: string;
  amount: number;
  name: string;
  order_id: string;
  prefill: {
    email: string;
    contact: string;
    name: string;
  };
  theme: {
    color: string;
  };
}

export const openRazorpayCheckout = async (options: RazorpayOptions): Promise<any> => {
  try {
    // Razorpay React Native SDK integration
    // This requires react-native-razorpay to be installed with native modules
    const RazorpayCheckout = require('react-native-razorpay').default;
    const data = await RazorpayCheckout.open(options);
    return { success: true, data };
  } catch (error: any) {
    Alert.alert('Payment Failed', error?.description || 'Something went wrong');
    return { success: false, error };
  }
};

export const createRazorpayOptions = (
  orderId: string,
  amount: number,
  customerName: string,
  customerEmail: string,
  customerPhone: string
): RazorpayOptions => ({
  description: 'Custom Clothing Order - Threadify',
  currency: 'INR',
  key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || '',
  amount: amount * 100, // Convert to paise
  name: 'Threadify',
  order_id: orderId,
  prefill: {
    email: customerEmail,
    contact: customerPhone,
    name: customerName,
  },
  theme: {
    color: '#b7860b',
  },
});
