import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  fullWidth = true,
}) => {
  const baseClasses = 'flex-row items-center justify-center rounded-xl';
  const sizeClasses = {
    sm: 'h-9 px-4',
    md: 'h-12 px-6',
    lg: 'h-14 px-8',
  };
  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-primary/10',
    outline: 'border-2 border-primary/20 bg-transparent',
    ghost: 'bg-transparent',
  };
  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-primary',
    outline: 'text-primary',
    ghost: 'text-primary',
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${disabled || loading ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#b7860b'} />
      ) : (
        <>
          {icon}
          <Text
            className={`${textVariantClasses[variant]} font-bold ${
              size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
            } ${icon ? 'ml-2' : ''}`}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
