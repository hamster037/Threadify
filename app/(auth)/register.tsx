import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, fullName, role);
      Alert.alert('Success', 'Account created! Please check your email to verify.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') },
      ]);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo */}
            <View className="items-center mb-10">
              <Text className="font-serif text-4xl font-bold text-slate-900">
                Threadify<Text className="text-primary">.</Text>
              </Text>
              <Text className="text-slate-500 mt-2">Create your account</Text>
            </View>

            {/* Role Selector */}
            <View className="flex-row bg-primary/10 rounded-full p-1 mb-8">
              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-full items-center ${
                  role === 'customer' ? 'bg-primary' : ''
                }`}
                onPress={() => setRole('customer')}
              >
                <Text
                  className={`text-xs font-bold ${
                    role === 'customer' ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-full items-center ${
                  role === 'tailor' ? 'bg-primary' : ''
                }`}
                onPress={() => setRole('tailor')}
              >
                <Text
                  className={`text-xs font-bold ${
                    role === 'tailor' ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  Tailor
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
              <View className="h-3" />
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View className="h-3" />
              <Input
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View className="h-6" />

            <Button title="Create Account" onPress={handleRegister} loading={loading} />

            <View className="h-4" />

            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Text className="text-primary font-bold">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
