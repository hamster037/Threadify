import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../../components/ui/Button';
import { Avatar } from '../../../../components/ui/Avatar';

const MOCK_PROPOSALS = [
  {
    id: '1',
    tailor: { name: 'Ravi Kumar', rating: 4.8, reviews: 120 },
    quoted_price: 1200,
    timeline: '12 days',
    note: 'Specialist in bridal wear with perfect fit.',
    selected: true,
  },
  {
    id: '2',
    tailor: { name: 'Priya Mehta', rating: 4.9, reviews: 85 },
    quoted_price: 1500,
    timeline: '10 days',
    note: 'Premium boutique results with two fitting sessions.',
    selected: false,
  },
];

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams();
  const [selectedId, setSelectedId] = useState('1');

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#b7860b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 px-4">Request Details</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color="#b7860b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="m-4 rounded-xl bg-white border border-primary/10 p-4">
          <Text className="text-xs font-bold uppercase text-primary">Active Request</Text>
          <Text className="text-xl font-bold mt-1">Custom Wedding Lehenga</Text>
          <Text className="text-sm text-slate-600 mt-1">Silk, zardozi embroidery, winter wedding.</Text>
        </View>

        <Text className="text-xl font-bold px-4 pb-3">Tailor Proposals (6)</Text>

        <View className="px-4" style={{ gap: 16 }}>
          {MOCK_PROPOSALS.map((p) => (
            <View key={p.id} className={`rounded-xl bg-white p-4 ${selectedId === p.id ? 'border-2 border-primary' : 'border border-primary/10'}`}>
              <View className="flex-row gap-3">
                <Avatar name={p.tailor.name} size="lg" />
                <View className="flex-1">
                  <Text className="text-lg font-bold">{p.tailor.name}</Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text className="font-bold text-sm">{p.tailor.rating}</Text>
                    <Text className="text-sm text-slate-500">({p.tailor.reviews})</Text>
                  </View>
                </View>
                {selectedId === p.id && (
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color="#b7860b" />
                    <Text className="text-xs font-bold text-primary ml-1">Selected</Text>
                  </View>
                )}
              </View>

              <View className="mt-3 flex-row justify-between bg-primary/5 rounded-lg p-3">
                <View>
                  <Text className="text-xs text-slate-500 uppercase font-semibold">Quote</Text>
                  <Text className="text-lg font-bold text-primary">₹{p.quoted_price}</Text>
                </View>
                <View>
                  <Text className="text-xs text-slate-500 uppercase font-semibold">Timeline</Text>
                  <Text className="text-lg font-bold">{p.timeline}</Text>
                </View>
              </View>

              <Text className="text-sm text-slate-600 italic py-2">{p.note}</Text>

              <Button
                title={selectedId === p.id ? 'Selected' : 'Select This Tailor'}
                variant={selectedId === p.id ? 'primary' : 'outline'}
                onPress={() => setSelectedId(p.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-primary/10 flex-row items-center">
        <View className="flex-1">
          <Text className="text-xs text-slate-500 uppercase font-bold">Total Due</Text>
          <Text className="text-2xl font-black">₹1,200</Text>
        </View>
        <TouchableOpacity
          className="flex-[2] h-14 bg-primary rounded-xl items-center justify-center flex-row"
          onPress={() => router.push(`/(customer)/requests/${id}/track`)}
        >
          <Text className="text-white font-bold text-lg">Confirm & Pay</Text>
          <Ionicons name="card-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
