import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';

const STAGE_BUTTONS = [
  { label: 'Fabric Sourced', icon: 'cube-outline' as const },
  { label: 'Mark Cutting', icon: 'cut-outline' as const },
];

export default function ManageOrderScreen() {
  const { orderId } = useLocalSearchParams();
  const [updateNote, setUpdateNote] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#b7860b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Active Order #TR-8821</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={22} color="#b7860b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Customer Info */}
        <View className="bg-white p-4 mt-2">
          <View className="flex-row items-center gap-4 mb-4">
            <Avatar name="Sneha R" size="lg" />
            <View className="flex-1">
              <Text className="text-base font-bold">Sneha R.</Text>
              <Text className="text-sm text-slate-500">Linen Shirt - Custom Tailoring</Text>
            </View>
            <View className="bg-primary/10 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-primary uppercase">In Progress</Text>
            </View>
          </View>
          <View className="flex-row py-3 border-t border-primary/10">
            {[{ label: 'Chest', val: '38"' }, { label: 'Waist', val: '34"' }, { label: 'Length', val: '28"' }].map((m, i) => (
              <View key={i} className={`flex-1 items-center ${i < 2 ? 'border-r border-primary/10' : ''}`}>
                <Text className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{m.label}</Text>
                <Text className="font-semibold mt-1">{m.val}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Update Progress */}
        <View className="bg-white p-4 mt-2 border-y border-primary/10">
          <Text className="text-sm font-bold uppercase tracking-wider mb-4 flex-row items-center">
            <Ionicons name="create-outline" size={16} color="#b7860b" /> Update Progress
          </Text>
          <View className="flex-row gap-3 mb-4">
            {STAGE_BUTTONS.map((btn) => (
              <TouchableOpacity key={btn.label} className="flex-1 bg-primary/10 border border-primary/20 py-3 rounded-lg items-center">
                <Ionicons name={btn.icon} size={22} color="#b7860b" />
                <Text className="text-[11px] font-bold text-primary mt-1">{btn.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity className="bg-primary py-3 rounded-lg items-center flex-row justify-center gap-2">
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
            <Text className="text-white text-[11px] font-bold">Mark Stitching Complete</Text>
          </TouchableOpacity>

          <View className="mt-4">
            <Text className="text-[11px] font-bold text-slate-500 uppercase mb-2">Add Update Note (optional)</Text>
            <TextInput
              className="w-full bg-background-light border border-primary/10 rounded-lg p-3 text-sm min-h-[80px]"
              placeholder="Explain progress or mention specific details..."
              value={updateNote}
              onChangeText={setUpdateNote}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity className="w-full py-2 items-center mt-2">
              <Text className="text-primary text-xs font-bold">POST UPDATE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Preview */}
        <View className="bg-white p-4 mt-2 border-y border-primary/10">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="chatbubbles-outline" size={18} color="#b7860b" />
              <Text className="text-sm font-bold uppercase tracking-wider">Chat with Sneha</Text>
            </View>
            <View className="w-2 h-2 rounded-full bg-green-500" />
          </View>
          <View className="bg-background-light rounded-xl p-3 space-y-3 mb-3 border border-primary/5">
            <View className="max-w-[80%]">
              <View className="bg-white p-3 rounded-xl rounded-tl-none border border-primary/5">
                <Text className="text-sm">Hi, how is the shirt coming along?</Text>
              </View>
              <Text className="text-[10px] text-slate-400 mt-1 ml-1">10:30 AM</Text>
            </View>
            <View className="max-w-[80%] self-end">
              <View className="bg-primary p-3 rounded-xl rounded-tr-none">
                <Text className="text-sm text-white">Just finished the cutting. The linen fabric you chose looks great!</Text>
              </View>
              <Text className="text-[10px] text-slate-400 mt-1 text-right mr-1">10:45 AM</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <TextInput
              className="flex-1 bg-background-light border border-primary/10 rounded-full px-4 py-2 text-sm"
              placeholder="Type a message..."
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity className="bg-primary w-10 h-10 rounded-full items-center justify-center">
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Payout Breakdown */}
        <View className="bg-white p-4 mt-2 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="wallet-outline" size={18} color="#b7860b" />
            <Text className="text-sm font-bold uppercase tracking-wider">Payout Breakdown</Text>
          </View>
          <View className="bg-primary/5 rounded-xl p-4 space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-sm text-slate-600">Order Total</Text>
              <Text className="text-sm font-medium">₹2,450.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-slate-600">Platform Fee (15%)</Text>
              <Text className="text-sm font-medium text-rose">- ₹367.50</Text>
            </View>
            <View className="pt-2 border-t border-primary/10 flex-row justify-between">
              <Text className="font-bold">Estimated Payout</Text>
              <Text className="text-primary font-bold text-lg">₹2,082.50</Text>
            </View>
          </View>
          <Text className="text-[10px] text-slate-400 mt-3 text-center italic">
            Funds will be credited to your wallet 24h after delivery confirmation.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
