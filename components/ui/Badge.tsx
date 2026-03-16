import React from 'react';
import { View, Text } from 'react-native';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-sage/10 text-sage',
    warning: 'bg-primary/10 text-primary',
    danger: 'bg-rose/10 text-rose',
    neutral: 'bg-slate-100 text-slate-600',
  };

  return (
    <View className={`rounded-full px-2.5 py-0.5 ${variants[variant]}`}>
      <Text className={`text-xs font-medium ${variants[variant]}`}>{text}</Text>
    </View>
  );
};
