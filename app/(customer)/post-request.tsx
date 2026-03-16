import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useCreateRequest } from '../../hooks/useRequests';
import { useAuthStore } from '../../stores/authStore';
import { Image } from 'react-native';

const OCCASIONS = ['Casual', 'Formal', 'Wedding', 'Party', 'Business'];
const OUTFIT_TYPES = ['Shirt', 'Dress', 'Suit', 'Trousers', 'Ethnic Wear', 'Kurta', 'Lehenga'];

export default function PostRequestScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [outfitType, setOutfitType] = useState('');
  const [fabric, setFabric] = useState('');
  const [color, setColor] = useState('');
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [budgetMin] = useState(500);
  const [budgetMax, setBudgetMax] = useState(5000);
  const [deadline, setDeadline] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [shoulder, setShoulder] = useState('');

  const user = useAuthStore((s) => s.user);
  const createRequest = useCreateRequest();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleSubmit = async () => {
    if (!outfitType) {
      Alert.alert('Error', 'Please select an outfit type');
      return;
    }
    try {
      await createRequest.mutateAsync({
        customer_id: user?.id,
        outfit_type: outfitType,
        reference_image_url: imageUri || 'https://placeholder.com/outfit.jpg',
        fabric_preference: fabric || null,
        color_preference: color || null,
        occasion: selectedOccasions,
        notes: notes || null,
        budget_min: budgetMin,
        budget_max: budgetMax,
        deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        measurements: {
          height: height ? Number(height) : undefined,
          weight: weight ? Number(weight) : undefined,
          chest: chest ? Number(chest) : undefined,
          waist: waist ? Number(waist) : undefined,
          hips: hips ? Number(hips) : undefined,
          shoulder: shoulder ? Number(shoulder) : undefined,
        },
      });
      Alert.alert('Success', 'Your request has been posted!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-primary/10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 ml-2">Describe your dream outfit</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4 space-y-6">
          {/* Reference Image Upload */}
          <TouchableOpacity
            onPress={pickImage}
            className="items-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-10"
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} className="w-full h-48 rounded-lg" resizeMode="cover" />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={40} color="#b7860b" />
                <Text className="text-lg font-bold text-center mt-2">Upload reference images</Text>
                <Text className="text-sm text-slate-500 text-center">Tap to upload photos of your dream outfit</Text>
                <View className="mt-3 bg-primary rounded-lg px-4 py-2">
                  <Text className="text-white text-sm font-bold">Upload Image</Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          {/* Outfit Type */}
          <View>
            <Text className="text-sm font-semibold text-slate-900 mb-2">Outfit type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {OUTFIT_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setOutfitType(type)}
                    className={`px-4 py-2 rounded-lg border ${
                      outfitType === type
                        ? 'bg-primary border-primary'
                        : 'border-primary/20 bg-white'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${outfitType === type ? 'text-white' : 'text-slate-700'}`}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Fabric & Color */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Input label="Fabric" placeholder="e.g. Silk, Cotton" value={fabric} onChangeText={setFabric} />
            </View>
            <View className="flex-1">
              <Input label="Color" placeholder="e.g. Emerald Green" value={color} onChangeText={setColor} />
            </View>
          </View>

          {/* Occasion Tags */}
          <View>
            <Text className="text-sm font-semibold text-slate-900 mb-2">Occasion</Text>
            <View className="flex-row flex-wrap gap-2">
              {OCCASIONS.map((occ) => (
                <TouchableOpacity
                  key={occ}
                  onPress={() => toggleOccasion(occ)}
                  className={`px-4 py-1.5 rounded-full border border-primary/30 ${
                    selectedOccasions.includes(occ) ? 'bg-primary/10' : ''
                  }`}
                >
                  <Text className={`text-xs font-medium ${selectedOccasions.includes(occ) ? 'text-primary' : 'text-slate-600'}`}>
                    {occ}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Special Notes */}
          <View>
            <Text className="text-sm font-semibold text-slate-900 mb-2">Special notes</Text>
            <TextInput
              className="w-full rounded-lg border border-primary/20 bg-white p-3 text-sm text-slate-900 min-h-[80px]"
              placeholder="Add any specific details or customizations..."
              multiline
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Measurements */}
          <View className="pt-4 border-t border-primary/10">
            <View className="flex-row items-center mb-4">
              <Ionicons name="resize-outline" size={20} color="#1e293b" />
              <Text className="text-lg font-bold ml-2">Measurements (Optional)</Text>
            </View>
            <View className="flex-row flex-wrap gap-3">
              <View className="w-[47%]">
                <Text className="text-xs font-medium text-slate-500 uppercase mb-1">Height (cm)</Text>
                <TextInput className="w-full rounded-lg border border-primary/20 bg-white p-2 text-sm" placeholder="175" value={height} onChangeText={setHeight} keyboardType="numeric" placeholderTextColor="#94a3b8" />
              </View>
              <View className="w-[47%]">
                <Text className="text-xs font-medium text-slate-500 uppercase mb-1">Weight (kg)</Text>
                <TextInput className="w-full rounded-lg border border-primary/20 bg-white p-2 text-sm" placeholder="70" value={weight} onChangeText={setWeight} keyboardType="numeric" placeholderTextColor="#94a3b8" />
              </View>
              <View className="w-[47%]">
                <Text className="text-xs font-medium text-slate-500 uppercase mb-1">Chest</Text>
                <TextInput className="w-full rounded-lg border border-primary/20 bg-white p-2 text-sm" placeholder="38" value={chest} onChangeText={setChest} keyboardType="numeric" placeholderTextColor="#94a3b8" />
              </View>
              <View className="w-[47%]">
                <Text className="text-xs font-medium text-slate-500 uppercase mb-1">Waist</Text>
                <TextInput className="w-full rounded-lg border border-primary/20 bg-white p-2 text-sm" placeholder="32" value={waist} onChangeText={setWaist} keyboardType="numeric" placeholderTextColor="#94a3b8" />
              </View>
              <View className="w-[47%]">
                <Text className="text-xs font-medium text-slate-500 uppercase mb-1">Hips</Text>
                <TextInput className="w-full rounded-lg border border-primary/20 bg-white p-2 text-sm" placeholder="40" value={hips} onChangeText={setHips} keyboardType="numeric" placeholderTextColor="#94a3b8" />
              </View>
              <View className="w-[47%]">
                <Text className="text-xs font-medium text-slate-500 uppercase mb-1">Shoulder</Text>
                <TextInput className="w-full rounded-lg border border-primary/20 bg-white p-2 text-sm" placeholder="18" value={shoulder} onChangeText={setShoulder} keyboardType="numeric" placeholderTextColor="#94a3b8" />
              </View>
            </View>
          </View>

          {/* Budget */}
          <View className="pt-4 border-t border-primary/10">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-semibold">Budget Range</Text>
              <Text className="text-primary font-bold">₹{budgetMin} – ₹{budgetMax}</Text>
            </View>
          </View>

          {/* Deadline */}
          <Input label="Deadline" placeholder="YYYY-MM-DD" value={deadline} onChangeText={setDeadline} />
        </View>
      </ScrollView>

      {/* Sticky Submit */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 border-t border-primary/10">
        <Button
          title="Submit Request"
          onPress={handleSubmit}
          loading={createRequest.isPending}
          icon={<Ionicons name="send" size={18} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  );
}
