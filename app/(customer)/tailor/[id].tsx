import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/ui/Button';

export default function TailorProfileScreen() {
  const { id } = useLocalSearchParams();
  const SPECS = ['Kurtas', 'Suits', 'Sherwanis', 'Alterations'];

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <View className="flex-row items-center px-4 py-3 bg-white/80 border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 ml-2">Tailor Profile</Text>
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-primary/10 items-center justify-center">
          <Ionicons name="share-outline" size={20} color="#b7860b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Hero */}
        <View className="h-48 bg-gradient-to-r from-primary/40 to-primary/10 bg-primary/20" />
        <View className="px-4 -mt-16">
          <View className="w-28 h-28 rounded-full border-4 border-white bg-primary/20 items-center justify-center">
            <Text className="text-3xl font-bold text-primary">RK</Text>
          </View>
          <Text className="text-3xl font-bold mt-3">Ravi Kumar</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location" size={14} color="#b7860b" />
            <Text className="text-primary font-medium ml-1">Delhi, India</Text>
          </View>
          <Text className="text-slate-600 mt-2">
            Master craftsman specializing in bespoke ethnic wear and contemporary wedding suits. 15+ years.
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 px-4 mt-6">
          <View className="flex-1 bg-white p-4 rounded-xl border border-primary/10">
            <Text className="text-sm text-slate-500">Rating</Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-xl font-bold">4.9</Text>
              <Ionicons name="star" size={14} color="#b7860b" />
            </View>
          </View>
          <View className="flex-1 bg-white p-4 rounded-xl border border-primary/10">
            <Text className="text-sm text-slate-500">Reviews</Text>
            <Text className="text-xl font-bold">128</Text>
          </View>
        </View>

        {/* Specialties */}
        <View className="flex-row flex-wrap gap-2 px-4 mt-4">
          {SPECS.map((s) => (
            <View key={s} className="px-4 py-2 bg-primary/10 rounded-full">
              <Text className="text-sm font-semibold text-primary">{s}</Text>
            </View>
          ))}
        </View>

        {/* Portfolio */}
        <View className="mt-8 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Portfolio</Text>
            <Text className="text-primary font-bold text-sm">View All</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {['Italian Slim Fit', 'Bespoke Cuffs', 'Summer Kurta', 'Velvet Sherwani'].map((item, i) => (
              <View key={i} className="w-[47%] aspect-[3/4] rounded-lg bg-primary/10 items-center justify-center overflow-hidden">
                <Text className="text-xs font-medium text-primary">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View className="mt-8 px-4">
          <Text className="text-xl font-bold mb-4">Customer Reviews</Text>
          {[
            { name: 'Amit Sharma', rating: 5, text: '"Impeccable fit for my wedding suit."', time: '2 weeks ago' },
            { name: 'Priya V.', rating: 4.5, text: '"Excellent kurta work. Professional finish."', time: '1 month ago' },
          ].map((r, i) => (
            <View key={i} className="bg-white p-4 rounded-xl border border-slate-200 mb-3">
              <View className="flex-row justify-between mb-2">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                    <Text className="font-bold text-primary">{r.name[0]}</Text>
                  </View>
                  <View>
                    <Text className="font-bold text-sm">{r.name}</Text>
                    <Text className="text-xs text-slate-500">{r.time}</Text>
                  </View>
                </View>
                <View className="flex-row">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Ionicons key={j} name="star" size={12} color={j < Math.floor(r.rating) ? '#b7860b' : '#e2e8f0'} />
                  ))}
                </View>
              </View>
              <Text className="text-sm text-slate-600 italic">{r.text}</Text>
            </View>
          ))}
          <TouchableOpacity className="w-full py-3 border border-primary/20 rounded-lg items-center">
            <Text className="text-primary font-bold">Read All 128 Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Pricing & CTA */}
        <View className="mt-8 mx-4 bg-white p-6 rounded-xl border border-primary/20">
          <Text className="text-sm text-slate-500">Starting from</Text>
          <Text className="text-3xl font-bold text-primary">₹1,200 <Text className="text-sm text-slate-500 font-normal">/ garment</Text></Text>
          <View className="mt-4 space-y-3">
            {[
              { icon: 'checkmark-circle-outline' as const, text: 'Quality Guaranteed' },
              { icon: 'time-outline' as const, text: 'Standard 7-day Delivery' },
              { icon: 'home-outline' as const, text: 'Home measurement available' },
            ].map((item, i) => (
              <View key={i} className="flex-row items-center gap-3 mt-2">
                <Ionicons name={item.icon} size={18} color="#b7860b" />
                <Text className="text-sm text-slate-600">{item.text}</Text>
              </View>
            ))}
          </View>
          <View className="mt-6 space-y-3">
            <Button title="Request This Tailor" />
            <View className="h-2" />
            <Button title="Message Ravi" variant="secondary" />
          </View>
        </View>

        {/* Availability */}
        <View className="mx-4 mt-4 bg-green-50 border border-green-200 p-4 rounded-xl flex-row items-center gap-3">
          <View className="w-2 h-2 rounded-full bg-green-500" />
          <Text className="text-sm font-semibold text-green-700">Available for new orders</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
