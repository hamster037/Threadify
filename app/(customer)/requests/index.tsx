import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMyRequests } from '../../../hooks/useRequests';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { ClothingRequest } from '../../../types';

const TABS = ['All', 'Open', 'In Progress', 'Completed'];

const MOCK_REQUESTS: ClothingRequest[] = [
  {
    id: '1',
    customer_id: '1',
    outfit_type: 'Oversized linen shirt',
    reference_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1kj2bEbS0PQJWPzri8VSSgz3GouA6tNnsuZpm5GFYcSAfju-JNmfy8cN-4VXRWjBP32E9TZWL4zhOM6rL3y8_fBVAP5FNJLYIE4WfPh2WK0u6E9cjldkyCSM-YOavcD4KUGXUNYWFmQszTr28CjQOpgfhjhLoDj91h50ywHhEGR79K4iaNwRbo8VARPlK-536EooafhSFYQwJpTY8E9qXgnwdSybyQmdPoqQDSxCmqjJXPH45tbx4BLULEP_l7RJwOyNxKSbUgKmN',
    fabric_preference: 'Linen',
    color_preference: null,
    occasion: ['Casual'],
    notes: null,
    budget_min: 800,
    budget_max: 1200,
    deadline: '2024-01-15',
    measurements: {},
    status: 'open',
    proposal_count: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    customer_id: '1',
    outfit_type: 'Custom Denim Jacket',
    reference_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIQ_kCz7UJ3GhVsjEwrDSzZ5DP-HE5eXoZoNZ6eyu6H_qqZ-rvSzMx2ROzgnFniKq9DCFKBk5_t_BHlb8aFbkaTG-4d1aSgmV2LvexlSWeeVL2-7CZ8iTQtLp_JeY3PExjAvzSBRI1JBwkwuQKQbkCMjGU_5aGz2Ww52-Pwy7Byxa4uXApIX5na-Y4uK8Qj8jgznPUID3UQj_pAH9ZT9dPNKzQ02OZ5vztZP4FVU_ThEZ6cwT7QJuV6aeZLvoQ_tHRcaWi7w7OWbeC',
    fabric_preference: 'Denim',
    color_preference: null,
    occasion: [],
    notes: null,
    budget_min: 2000,
    budget_max: 3500,
    deadline: '2024-02-01',
    measurements: {},
    status: 'in_production',
    proposal_count: 3,
    created_at: new Date().toISOString(),
  },
];

export default function MyRequestsScreen() {
  const [activeTab, setActiveTab] = useState('Open');
  const { data: requests } = useMyRequests();
  const displayRequests = requests?.length ? requests : MOCK_REQUESTS;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return { text: 'Open for Proposals', variant: 'primary' as const };
      case 'in_production': return { text: 'In Progress', variant: 'neutral' as const };
      case 'completed': return { text: 'Completed', variant: 'success' as const };
      default: return { text: status, variant: 'neutral' as const };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="#b7860b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center pr-10">Your Requests</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-primary/10 px-4">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-3 px-4 border-b-2 ${
              activeTab === tab ? 'border-primary' : 'border-transparent'
            }`}
          >
            <Text className={`text-sm font-bold ${activeTab === tab ? 'text-primary' : 'text-slate-500'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Request Cards */}
      <ScrollView className="flex-1 p-4" contentContainerStyle={{ gap: 16 }}>
        {displayRequests.map((req) => {
          const badge = getStatusBadge(req.status);
          return (
            <View key={req.id} className="rounded-xl border border-primary/10 bg-white overflow-hidden">
              <Image
                source={{ uri: req.reference_image_url }}
                className="w-full h-48"
                resizeMode="cover"
              />
              <View className="p-4">
                <View className="flex-row items-center gap-2 mb-1">
                  <Badge text={badge.text} variant={badge.variant} />
                  {req.proposal_count > 0 && (
                    <Badge text={`${req.proposal_count} Proposals`} variant="neutral" />
                  )}
                </View>
                <Text className="text-lg font-bold mt-2">{req.outfit_type}</Text>
                {req.occasion.length > 0 && (
                  <View className="flex-row gap-2 mt-2">
                    {req.occasion.map((o) => (
                      <View key={o} className="h-7 items-center justify-center rounded-lg bg-background-light px-3">
                        <Text className="text-xs font-medium text-slate-700">{o}</Text>
                      </View>
                    ))}
                    {req.fabric_preference && (
                      <View className="h-7 items-center justify-center rounded-lg bg-background-light px-3">
                        <Text className="text-xs font-medium text-slate-700">{req.fabric_preference}</Text>
                      </View>
                    )}
                  </View>
                )}
                <View className="border-t border-primary/5 pt-3 mt-3">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Ionicons name="card-outline" size={14} color="#b7860b" />
                    <Text className="text-sm text-slate-600">Budget: ₹{req.budget_max}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar-outline" size={14} color="#b7860b" />
                    <Text className="text-sm text-slate-600">Deadline: 10 days</Text>
                  </View>
                </View>
                {req.status === 'open' && (
                  <View className="mt-3">
                    <Button
                      title="View Proposals"
                      size="sm"
                      onPress={() => router.push(`/(customer)/requests/${req.id}`)}
                    />
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
