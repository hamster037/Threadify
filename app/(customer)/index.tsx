import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';

const FEATURED_TAILORS = [
  {
    id: '1',
    name: 'Ravi Kumar',
    specialty: 'Traditional Ethnic Wear',
    rating: 4.9,
    price: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqi8Kjp4MrZT_9Xu28YhiN_7tnx7O9pNyS36XefOHd0H-ffgKa5DCf8gk8EFYpzYDDBfsvDic4i8rUE9zOQbHKAXi1RTDfXKPoaLDt5RTpJk0Htpns2Nq7pdr9IRqaVp1rAIvQmNJDDChgGldyNs1FolGoNsKJFIMFy8jEPvF3ZxOi3jiA9rhOQAkK79CfMc1Q_TQy4zfEwP3ryzTGye2uBfZmhbspSnubDXh4AEt0isFrXRP40qmMbI9LrknKVYfC1VATvabEGC-',
  },
  {
    id: '2',
    name: 'Priya Mehta',
    specialty: 'Evening Gowns & Bridal',
    rating: 4.7,
    price: 250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl7ysBLtx93p8Jx4QTpQoUwWBdcYrA543aEzw9HC66UWhrqLN25h3ZKbx061XO7MxnJmf6bsSpwVi9sbi_jZJzntv1hpB0WYiZBwfEyB-8fh3IhNCo6SX3QZU6n_RSLiyR5LL0WPzUMcVNUHU43RlOGkFVT7HxwVwSNCaiBDHS7snnuHu8bQc6PTRGK6xlAEBV1njovrVLYDiifgBCq7h6zqNwWoHJo6WXp6hhXME4Do9YZyCcb3kJQbF1sxNyRxn2Kz1Clu01S6aV',
  },
  {
    id: '3',
    name: 'Arjun Nair',
    specialty: 'Modern Bespoke Suits',
    rating: 4.8,
    price: 180,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARWKMdkykD-2AxUlW82sJK09_L8E-tmkbiU3sa1XiNhR5BfIrDYOarTIfnJIBviuWJsTDpEvJo9lScmNlHi8kCCcEBjH8ZTcLE32SpyFBv7qAqsIqOLSiS8yntq6CqFqaM0x9atwF1gjkugiKukjAj-ma6V3ce1XIu1bYAt6WfrXZgeZ7z7jLtpk1_3HsqaEGKnox-HdDkoKirPimEQhHYQ5lmBq6gR5mVHVrUo3bR5wBGpXKL9R36jQY9ZHps4F8lJxuRGfk5Eqs7',
  },
];

const STEPS = [
  { icon: 'create-outline' as const, title: 'Describe Style', desc: 'Share your vision with photos or sketches.', num: 1 },
  { icon: 'pricetags-outline' as const, title: 'Get Quotes', desc: 'Receive bids from verified tailors.', num: 2 },
  { icon: 'resize-outline' as const, title: 'Virtual Fitting', desc: 'Secure digital measurement session.', num: 3 },
  { icon: 'cut-outline' as const, title: 'Crafting', desc: 'Tailor brings your garment to life.', num: 4 },
  { icon: 'car-outline' as const, title: 'Doorstep Delivery', desc: 'Wear your custom piece with pride.', num: 5 },
];

export default function CustomerHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Navbar */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-primary/10">
          <Text className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'PlayfairDisplay_700Bold' }}>
            Threadify<Text className="text-primary">.</Text>
          </Text>
          <View className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 items-center justify-center">
            <Ionicons name="person" size={20} color="#b7860b" />
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-16 items-center">
          <View className="flex-row items-center bg-primary/10 rounded-full px-4 py-1.5 mb-6">
            <Ionicons name="sparkles" size={14} color="#b7860b" />
            <Text className="text-primary text-sm font-semibold ml-1">Now in Beta</Text>
          </View>
          <Text className="text-4xl font-bold text-center text-slate-900 mb-4" style={{ fontFamily: 'PlayfairDisplay_700Bold' }}>
            Wear exactly what you{' '}
            <Text className="text-primary italic">imagined</Text>
          </Text>
          <Text className="text-center text-slate-600 text-base mb-8 px-4">
            Connect with world-class artisans to create bespoke clothing tailored to your unique style and measurements.
          </Text>
          <View className="w-full px-4">
            <Button title="Post a Request" onPress={() => router.push('/(customer)/post-request')} />
            <View className="h-3" />
            <Button title="Join as Tailor" variant="outline" onPress={() => router.push('/(auth)/register')} />
          </View>
        </View>

        {/* How it Works */}
        <View className="bg-white/50 py-12 px-4">
          <Text className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'PlayfairDisplay_700Bold' }}>
            How it works
          </Text>
          {STEPS.map((step) => (
            <View key={step.num} className="flex-row items-start mb-6 px-4">
              <View className="relative w-14 h-14 rounded-full bg-primary items-center justify-center mr-4">
                <Ionicons name={step.icon} size={24} color="#fff" />
                <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background-dark items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">{step.num}</Text>
                </View>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-base mb-1">{step.title}</Text>
                <Text className="text-sm text-slate-600">{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Stats Bar */}
        <View className="bg-background-dark py-10 px-4">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">2,400+</Text>
              <Text className="text-xs uppercase tracking-widest text-slate-400">Verified Tailors</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">18,000+</Text>
              <Text className="text-xs uppercase tracking-widest text-slate-400">Custom Orders</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">4.8★</Text>
              <Text className="text-xs uppercase tracking-widest text-slate-400">Rating</Text>
            </View>
          </View>
        </View>

        {/* Featured Tailors */}
        <View className="py-10">
          <View className="flex-row items-end justify-between px-4 mb-6">
            <View>
              <Text className="text-2xl font-bold" style={{ fontFamily: 'PlayfairDisplay_700Bold' }}>
                Featured Tailors
              </Text>
              <Text className="text-slate-600 text-sm">Hand-picked masters of their craft</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-primary font-bold text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_TAILORS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-72 mr-4 rounded-xl bg-white overflow-hidden border border-primary/10"
                onPress={() => router.push(`/(customer)/tailor/${item.id}`)}
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-lg font-bold">{item.name}</Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm font-bold text-primary">{item.rating}</Text>
                      <Ionicons name="star" size={14} color="#b7860b" />
                    </View>
                  </View>
                  <Text className="text-sm text-slate-500 mb-3">Specialty: {item.specialty}</Text>
                  <View className="flex-row items-center justify-between border-t border-slate-100 pt-3">
                    <Text className="text-xs text-slate-400">Starting from</Text>
                    <Text className="text-lg font-bold text-primary">${item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
