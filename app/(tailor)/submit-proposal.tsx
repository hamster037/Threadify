import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/ui/Button';

export default function SubmitProposalScreen() {
  const { requestId } = useLocalSearchParams();
  const [price, setPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    if (!price) {
      Alert.alert('Error', 'Please enter a quoted price');
      return;
    }
    setLoading(true);
    // In production, this would call useCreateProposal mutation
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your proposal has been submitted!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-row items-center p-4 border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="#b7860b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-2">Submit Proposal</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Request Summary */}
        <View className="p-4 border-b border-primary/10 bg-primary/5">
          <Text className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Request Summary</Text>
          <View className="flex-row gap-4 items-center">
            <View className="w-20 h-20 rounded-lg bg-primary/10 items-center justify-center">
              <Ionicons name="shirt-outline" size={32} color="#b7860b" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold">Oversized Linen Shirt</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Ionicons name="person-outline" size={14} color="#64748b" />
                <Text className="text-sm text-slate-600">Customer: Sneha R.</Text>
              </View>
              <Text className="text-xs text-slate-500 mt-1">Requested 2 days ago</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View className="p-4 space-y-6">
          {/* Price */}
          <View>
            <Text className="text-sm font-semibold text-slate-700 mb-2">Quoted Price (₹)</Text>
            <View className="relative">
              <Text className="absolute left-4 top-3.5 text-slate-400">₹</Text>
              <TextInput
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-sm"
                placeholder="e.g. 2500"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Delivery Date */}
          <View className="mt-4">
            <Text className="text-sm font-semibold text-slate-700 mb-2">Estimated Delivery Date</Text>
            <View className="relative">
              <Ionicons name="calendar-outline" size={20} color="#b7860b" style={{ position: 'absolute', left: 12, top: 14, zIndex: 1 }} />
              <TextInput
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-sm"
                placeholder="YYYY-MM-DD"
                value={deliveryDate}
                onChangeText={setDeliveryDate}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Note */}
          <View className="mt-4">
            <Text className="text-sm font-semibold text-slate-700 mb-2">Proposal Note</Text>
            <TextInput
              className="w-full p-4 rounded-lg border border-slate-200 bg-white text-sm min-h-[120px]"
              placeholder="Describe your approach, materials you'll use, or ask for clarifications..."
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Reference Images */}
          <View className="mt-4">
            <Text className="text-sm font-semibold text-slate-700 mb-2">Reference Images (Optional)</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={pickImage}
                className="w-20 h-20 rounded-lg border-2 border-dashed border-primary/30 items-center justify-center"
              >
                <Ionicons name="camera-outline" size={24} color="#b7860b" />
                <Text className="text-[10px] mt-1 font-medium text-primary">Add</Text>
              </TouchableOpacity>
              {images.map((uri, i) => (
                <View key={i} className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                  <TouchableOpacity
                    onPress={() => setImages((p) => p.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5"
                  >
                    <Ionicons name="close" size={12} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text className="text-xs text-slate-500 mt-1">Show past work or fabric samples relevant to this request.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-4 bg-white border-t border-primary/10">
        <Button
          title="Submit Proposal"
          onPress={handleSubmit}
          loading={loading}
          icon={<Ionicons name="send" size={18} color="#fff" />}
        />
        <Text className="text-[10px] text-center text-slate-400 mt-3">
          By submitting, you agree to the Terms of Service. Proposals are visible for 7 days.
        </Text>
      </View>
    </SafeAreaView>
  );
}
