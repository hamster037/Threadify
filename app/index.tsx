import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-light items-center justify-center">
        <ActivityIndicator size="large" color="#b7860b" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (role === 'tailor') {
    return <Redirect href="/(tailor)/dashboard" />;
  }

  return <Redirect href="/(customer)/" />;
}
