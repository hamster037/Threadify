import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <View className="space-y-1">
      {label && (
        <Text className="text-sm font-semibold text-slate-700">{label}</Text>
      )}
      <View className="relative">
        {icon && (
          <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
            {icon}
          </View>
        )}
        <TextInput
          className={`w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm text-slate-900 ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-rose-500' : ''}`}
          placeholderTextColor="#94a3b8"
          {...props}
        />
      </View>
      {error && <Text className="text-xs text-rose-500 mt-1">{error}</Text>}
    </View>
  );
};
