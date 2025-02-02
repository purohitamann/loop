import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import '../global.css';
import { useAuth } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

export default function HomeScreen() {
    const { user, getFollowers, followers } = useAuth();
    const [following, setFollowing] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (user?.id) {
            getFollowers(user.id);
        }
    }, [user?.id]); // ✅ Ensures followers update when user.id changes

    useEffect(() => {
        setFollowing(followers);
    }, [followers]); // ✅ Updates `following` state when `followers` change

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <Header title="Followers" color="black" goBack searchIcon={false} />

            <FlatList
                data={following}
                keyExtractor={(item) => item.user_id}
                contentContainerStyle={{ paddingBottom: 20 }} // ✅ Prevents last item from being cut off
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/user?user_id=${item.user_id}`)}
                        className="flex-row items-center justify-between p-4 bg-gray-100 rounded-lg mb-3"
                        activeOpacity={0.7} // ✅ Adds subtle press effect
                    >
                        {/* Icon */}
                        <View className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500">
                            <Ionicons name="people" size={24} color="white" />
                        </View>

                        {/* User ID */}
                        <Text className="text-base font-semibold text-black flex-1 ml-4">
                            {item?.User.username || 'Unknown User'}
                        </Text>

                        {/* Arrow Icon */}
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
