import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export default function TailorProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="px-4 py-3 bg-white border-b border-primary/10">
        <Text className="text-lg font-bold">Profile</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        {/* Profile Card */}
        <View className="bg-white rounded-xl border border-primary/10 p-6 items-center mb-6">
          <Avatar name={user?.full_name || 'Tailor'} size="lg" />
          <Text className="text-xl font-bold mt-3">{user?.full_name || 'Ravi Kumar'}</Text>
          <Text className="text-sm text-slate-500">{user?.email || 'ravi@threadify.com'}</Text>
          <View className="flex-row items-center gap-1 mt-1">
            <View className="w-2 h-2 rounded-full bg-green-500" />
            <Text className="text-xs text-green-700 font-medium">Available for orders</Text>
          </View>
        </View>

        {/* Menu Items */}
        {[
          { icon: 'person-outline' as const, label: 'Edit Profile' },
          { icon: 'images-outline' as const, label: 'Portfolio' },
          { icon: 'star-outline' as const, label: 'Reviews' },
          { icon: 'card-outline' as const, label: 'Payment Settings' },
          { icon: 'notifications-outline' as const, label: 'Notifications' },
          { icon: 'help-circle-outline' as const, label: 'Help & Support' },
        ].map((item, i) => (
          <TouchableOpacity key={i} className="bg-white rounded-xl border border-primary/10 p-4 mb-2 flex-row items-center">
            <Ionicons name={item.icon} size={22} color="#b7860b" />
            <Text className="flex-1 ml-3 font-medium">{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>
        ))}

        <View className="mt-6">
          <Button
            title="Sign Out"
            variant="outline"
            onPress={signOut}
            icon={<Ionicons name="log-out-outline" size={18} color="#b7860b" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
