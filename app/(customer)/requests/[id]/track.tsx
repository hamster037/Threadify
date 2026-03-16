import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../../components/ui/Avatar';
import { Button } from '../../../../components/ui/Button';

const STAGES = [
  { label: 'Order Confirmed', done: true, time: 'Mar 1, 2:30 PM' },
  { label: 'Fabric Sourced', done: true, time: 'Mar 3, 11:00 AM' },
  { label: 'Cutting Complete', done: true, time: 'Mar 5, 4:15 PM' },
  { label: 'Stitching in Progress', done: false, active: true, time: 'Mar 7' },
  { label: 'Quality Check', done: false, time: '' },
  { label: 'Shipped', done: false, time: '' },
];

export default function OrderTrackerScreen() {
  const completedCount = STAGES.filter((s) => s.done).length;
  const progress = (completedCount / STAGES.length) * 100;

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#b7860b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center pr-10">Order Tracker</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Status Banner */}
        <View className="m-4 bg-primary rounded-xl p-5">
          <Text className="text-white/80 text-xs uppercase font-bold tracking-wider">Order #TR-8821</Text>
          <Text className="text-white text-xl font-bold mt-1">Stitching in Progress ✦</Text>
          <View className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <View className="bg-white rounded-full h-2" style={{ width: `${progress}%` }} />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-white/70 text-xs">Step {completedCount} of {STAGES.length}</Text>
            <Text className="text-white/70 text-xs">~5 days left</Text>
          </View>
        </View>

        {/* Timeline */}
        <View className="px-4">
          <Text className="text-lg font-bold mb-4">Production Timeline</Text>
          {STAGES.map((stage, i) => (
            <View key={i} className="flex-row mb-1">
              <View className="items-center w-8 mr-3">
                <View className={`w-5 h-5 rounded-full items-center justify-center ${
                  stage.done ? 'bg-primary' : stage.active ? 'bg-primary/30' : 'bg-slate-200'
                }`}>
                  {stage.done && <Ionicons name="checkmark" size={12} color="#fff" />}
                  {stage.active && <View className="w-2 h-2 rounded-full bg-primary" />}
                </View>
                {i < STAGES.length - 1 && (
                  <View className={`w-0.5 flex-1 min-h-[32px] ${stage.done ? 'bg-primary' : 'bg-slate-200'}`} />
                )}
              </View>
              <View className="flex-1 pb-4">
                <Text className={`font-bold text-sm ${stage.done || stage.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {stage.label}
                </Text>
                {stage.time ? <Text className="text-xs text-slate-500 mt-0.5">{stage.time}</Text> : null}
              </View>
            </View>
          ))}
        </View>

        {/* Tailor Note */}
        <View className="mx-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <Text className="text-sm font-bold mb-1">Note from Tailor</Text>
          <Text className="text-sm text-slate-600 italic">
            "The fabric you chose looks beautiful. Currently working on the embroidery details."
          </Text>
        </View>

        {/* Chat Preview */}
        <View className="mx-4 mt-4 p-4 bg-white rounded-xl border border-primary/10">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Avatar name="Ravi K" size="sm" />
              <Text className="font-bold text-sm">Ravi Kumar</Text>
            </View>
            <View className="w-2 h-2 rounded-full bg-green-500" />
          </View>
          <View className="bg-background-light p-3 rounded-lg mb-2">
            <Text className="text-sm text-slate-700">Just finished the cutting. Looks great!</Text>
            <Text className="text-[10px] text-slate-400 mt-1">10:45 AM</Text>
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

        {/* Action Buttons */}
        <View className="px-4 mt-6 space-y-3">
          <Button title="Approve Order" icon={<Ionicons name="checkmark-circle-outline" size={18} color="#fff" />} />
          <View className="h-2" />
          <Button title="Request Alteration" variant="outline" icon={<Ionicons name="create-outline" size={18} color="#b7860b" />} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
