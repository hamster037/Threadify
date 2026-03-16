import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const TABS = ['Open Requests', 'My Proposals', 'Active Orders'];

const MOCK_REQUESTS = [
  {
    id: '1', title: 'Floral midi dress', budget: 1800, timeline: '14 days', urgent: true,
    desc: 'Custom fitting needed for lightweight summer fabric...',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCciNpT1pLK3K7LfzTFZu2yG5mAphVAI5n3kqfegPOCJZqaM_PqSI-1CW5Eue2Lnj8DoGowYAAruh_pxNTtozi9c7VI-CrX2pg6OjQrKjLmTmCcvjlsg2rDKF5G41vxZ68Ggl4PtL68Wd-xnmCVMnMs5Rd4AziuhEPyM2tj0gxPpCrmhC8vERy4A0fUX0z2oKBGP0JiC2ugnIDyu59lq-lirvT6x4gz25uuRJizNUNxLU0DGpFNBaik1D5hxcVMcaRIZA-9j2_R-dEG',
  },
  {
    id: '2', title: 'Linen Suit Jacket', budget: 4500, timeline: '21 days', urgent: false,
    desc: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwxyPsnmPLzUzZt5xeGYM6AtmXdOqzh9VihHxA9fQmcFo0a69WaFk6qJ0SnnCn7HP92FY_H9cjovmR68mppnCaDI-ZYnqbyBJExXQbhE5Xt4baf9fg2E5ntwRN1MamV7IWtNkktRAFY50SjGNT4bQ1OLjiXDePWIYrxsYWTQx7CyqqF3rW8QhQ9I9EktFB8AZKHUJ8pTZ9jby2wvjumXkyrldaJIQ-qrZlbLfBevF1PtHpEAN7l8l0DfYPv1nQcJaQ_p5ndiLdu_5a',
  },
];

export default function TailorDashboardScreen() {
  const [activeTab, setActiveTab] = useState('Open Requests');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Avatar name="Ravi K" size="md" />
          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold">Good morning, Ravi ✦</Text>
            <Text className="text-xs text-slate-500 font-medium">Master Tailor</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
            <Ionicons name="notifications-outline" size={22} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* Earnings Card */}
        <View className="px-4 mt-2">
          <View className="bg-background-dark rounded-xl p-6 relative overflow-hidden">
            <View className="absolute top-0 right-0 p-4 opacity-10">
              <Ionicons name="card" size={80} color="#b7860b" />
            </View>
            <Text className="text-primary/80 text-sm font-medium uppercase tracking-wider">Total Earnings</Text>
            <Text className="text-primary text-4xl font-black mt-1">₹45,000</Text>
            <View className="flex-row items-center justify-between mt-6">
              <View className="flex-row items-center gap-2">
                <Ionicons name="trending-up" size={14} color="#22c55e" />
                <Text className="text-slate-400 text-xs font-medium">+12% from last month</Text>
              </View>
              <TouchableOpacity className="bg-primary rounded-lg px-4 py-2">
                <Text className="text-white text-sm font-bold">View Reports</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 px-4 mt-4">
          {[
            { label: 'Active Orders', value: '4' },
            { label: 'Proposals', value: '12' },
            { label: 'Rating', value: '4.9', star: true },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 rounded-xl p-4 bg-primary/10 border border-primary/20">
              <Text className="text-slate-600 text-[10px] font-bold uppercase tracking-tighter">{stat.label}</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Text className="text-2xl font-black">{stat.value}</Text>
                {stat.star && <Ionicons name="star" size={14} color="#b7860b" />}
              </View>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View className="mt-6 border-b border-slate-200">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`py-3 mr-6 border-b-2 ${activeTab === tab ? 'border-primary' : 'border-transparent'}`}
              >
                <Text className={`text-sm font-bold ${activeTab === tab ? 'text-primary' : 'text-slate-500'}`}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Feed */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-bold">Recent Requests Near You</Text>
            <Text className="text-xs text-primary font-bold">Filter</Text>
          </View>
          {MOCK_REQUESTS.map((req) => (
            <View key={req.id} className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
              <View className="flex-row gap-4">
                <Image source={{ uri: req.image }} className="h-20 w-20 rounded-lg" resizeMode="cover" />
                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <Text className="text-base font-bold">{req.title}</Text>
                    <Badge text={req.urgent ? 'Urgent' : 'Standard'} variant={req.urgent ? 'primary' : 'neutral'} />
                  </View>
                  <View className="flex-row items-center gap-3 mt-1">
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="card-outline" size={14} color="#94a3b8" />
                      <Text className="text-xs text-slate-500">₹{req.budget.toLocaleString()}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={14} color="#94a3b8" />
                      <Text className="text-xs text-slate-500">{req.timeline}</Text>
                    </View>
                  </View>
                  {req.desc ? <Text className="text-xs text-slate-500 mt-2" numberOfLines={1}>{req.desc}</Text> : null}
                </View>
              </View>
              <View className="mt-4 pt-4 border-t border-slate-100 flex-row gap-2">
                <View className="flex-1">
                  <Button title="Submit Proposal" size="sm" onPress={() => router.push(`/(tailor)/submit-proposal?requestId=${req.id}`)} />
                </View>
                <TouchableOpacity className="w-10 h-10 bg-slate-100 rounded-lg items-center justify-center">
                  <Ionicons name="bookmark-outline" size={20} color="#475569" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
