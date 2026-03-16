import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white rounded-xl border border-primary/10',
    elevated: 'bg-white rounded-xl shadow-md border border-primary/10',
    bordered: 'bg-white rounded-xl border-2 border-primary',
  };

  return (
    <View className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </View>
  );
};
