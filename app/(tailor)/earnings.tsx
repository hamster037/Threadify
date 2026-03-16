import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function EarningsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="px-4 py-3 bg-white border-b border-primary/10">
        <Text className="text-lg font-bold">Earnings</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        {/* Total Earnings Card */}
        <View className="bg-background-dark rounded-xl p-6 mb-6">
          <Text className="text-primary/80 text-sm uppercase font-medium tracking-wider">Lifetime Earnings</Text>
          <Text className="text-primary text-4xl font-black mt-1">₹45,000</Text>
          <View className="flex-row mt-4 gap-6">
            <View>
              <Text className="text-slate-400 text-xs">This Month</Text>
              <Text className="text-white font-bold text-lg">₹12,500</Text>
            </View>
            <View>
              <Text className="text-slate-400 text-xs">Pending</Text>
              <Text className="text-white font-bold text-lg">₹4,200</Text>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <Text className="text-lg font-bold mb-3">Recent Transactions</Text>
        {[
          { label: 'Wedding Sherwani — Amit S.', amount: '₹8,500', date: 'Mar 10', type: 'credit' },
          { label: 'Platform Fee', amount: '- ₹1,275', date: 'Mar 10', type: 'debit' },
          { label: 'Linen Shirt — Sneha R.', amount: '₹2,450', date: 'Mar 5', type: 'credit' },
          { label: 'Platform Fee', amount: '- ₹367.50', date: 'Mar 5', type: 'debit' },
        ].map((tx, i) => (
          <View key={i} className="bg-white rounded-xl border border-primary/10 p-4 mb-2 flex-row items-center">
            <View className={`w-10 h-10 rounded-full items-center justify-center ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
              <Ionicons name={tx.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={18} color={tx.type === 'credit' ? '#16a34a' : '#dc2626'} />
            </View>
            <View className="flex-1 ml-3">
              <Text className="font-medium text-sm">{tx.label}</Text>
              <Text className="text-xs text-slate-500">{tx.date}</Text>
            </View>
            <Text className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{tx.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
