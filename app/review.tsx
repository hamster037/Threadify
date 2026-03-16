import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';

const SUB_RATINGS = [
  { key: 'stitching', label: 'Stitching Quality' },
  { key: 'fabric', label: 'Fabric Match' },
  { key: 'communication', label: 'Communication' },
  { key: 'onTime', label: 'On Time Delivery' },
];

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

export default function ReviewRatingScreen() {
  const [mainRating, setMainRating] = useState(4);
  const [subRatings, setSubRatings] = useState<Record<string, number>>({
    stitching: 4.8, fabric: 5.0, communication: 4.2, onTime: 4.5,
  });
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="p-6 items-center border-b border-slate-100 bg-white">
          <TouchableOpacity className="absolute top-4 right-4" onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#94a3b8" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-center">Rate Your Experience</Text>
          <Text className="text-slate-500 mt-1 text-center">How was the quality of your custom order?</Text>
        </View>

        <View className="p-6 bg-white">
          {/* Star Rating */}
          <View className="items-center mb-8">
            <View className="flex-row gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setMainRating(star)}>
                  <Ionicons
                    name={star <= mainRating ? 'star' : 'star-outline'}
                    size={48}
                    color={star <= mainRating ? '#b7860b' : '#e2e8f0'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-sm font-semibold text-primary uppercase tracking-wider mt-2">
              {RATING_LABELS[mainRating]}
            </Text>
          </View>

          {/* Sub-ratings */}
          <View className="bg-slate-50 p-5 rounded-xl mb-8">
            {SUB_RATINGS.map((sub) => {
              const val = subRatings[sub.key] || 0;
              return (
                <View key={sub.key} className="mb-4 last:mb-0">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-sm font-medium">{sub.label}</Text>
                    <Text className="text-xs text-primary font-bold">{val.toFixed(1)}</Text>
                  </View>
                  <View className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <View
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${(val / 5) * 100}%` }}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Comment */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-2">Your Review</Text>
            <TextInput
              className="w-full min-h-[120px] rounded-lg border border-slate-200 bg-white p-4 text-sm"
              placeholder="Share your thoughts on the fit, fabric, and overall craftsmanship..."
              value={comment}
              onChangeText={setComment}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Photo Upload */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-2">Add Photos</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-xl items-center justify-center">
                <Ionicons name="camera-outline" size={28} color="#94a3b8" />
                <Text className="text-[10px] mt-1 font-medium text-slate-400">Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Submit */}
        <View className="p-6 border-t border-slate-100 bg-slate-50/50">
          <Button
            title="Submit Review"
            onPress={handleSubmit}
            loading={loading}
            icon={<Ionicons name="send" size={18} color="#fff" />}
          />
          <Text className="text-center text-[11px] text-slate-400 mt-4">
            By submitting, you agree to our Community Guidelines and Terms of Service.
          </Text>
        </View>

        {/* Order Reference */}
        <View className="mx-6 mt-4 flex-row items-center justify-center gap-3 bg-white/80 px-6 py-3 rounded-full border border-primary/10">
          <Text className="text-sm text-slate-500">Order Ref: #TK-88219</Text>
          <View className="w-px h-4 bg-slate-200" />
          <Text className="text-sm text-primary font-bold">Custom Silk Suit</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
