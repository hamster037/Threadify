import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

const MOCK_ORDERS = [
  { id: '1', customer: 'Sneha R.', item: 'Linen Shirt', status: 'stitching', price: 2450 },
  { id: '2', customer: 'Amit S.', item: 'Wedding Sherwani', status: 'fabric_sourced', price: 8500 },
  { id: '3', customer: 'Priya V.', item: 'Summer Dress', status: 'delivered', price: 1800 },
];

export default function OrdersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="px-4 py-3 bg-white border-b border-primary/10">
        <Text className="text-lg font-bold">My Orders</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        {MOCK_ORDERS.map((order) => (
          <TouchableOpacity
            key={order.id}
            className="bg-white rounded-xl border border-primary/10 p-4 mb-3"
            onPress={() => router.push(`/(tailor)/manage-order?orderId=${order.id}`)}
          >
            <View className="flex-row items-center gap-3">
              <Avatar name={order.customer} size="md" />
              <View className="flex-1">
                <Text className="font-bold">{order.customer}</Text>
                <Text className="text-sm text-slate-500">{order.item}</Text>
              </View>
              <Badge text={order.status.replace('_', ' ')} variant={order.status === 'delivered' ? 'success' : 'primary'} />
            </View>
            <View className="flex-row justify-between mt-3 pt-3 border-t border-primary/5">
              <Text className="text-sm text-slate-500">Order Total</Text>
              <Text className="font-bold text-primary">₹{order.price.toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
