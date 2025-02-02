import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import '../global.css';
import { useAuth } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { supabase } from '@/utils/supabase';
import { useLocalSearchParams } from 'expo-router';
export default function HomeScreen() {
    const { user, getFollowers, followers } = useAuth();

    const router = useRouter();
    const [activity, setActivity] = useState([]);
    const params = useLocalSearchParams();

    // useEffect(() => {
    //     if (user?.id) {
    //         getComments(user.id);
    //     }
    // }, [user?.id]); // ✅ Ensures followers update when user.id changes

    useEffect(() => {
        getComments();
    }, [activity]); // ✅ Updates `following` state when `followers` change

    const getComments = async () => {
        const { data, error } = await supabase.from('Comment').select('*, User(username, id)')
            .order('created_at', { ascending: false }).limit(10);
        if (error) {
            return console.log(error)
        }
        getLikes(data);
        console.log(data)
    }
    const getLikes = async (comments: any) => {
        const { data, error } = await supabase.from('Like').select('*, User(username, id)').order('created_at', { ascending: false })
            .limit(10);
        if (error) {
            return console.log(error)
        }
        setActivity(comments.concat(data));
        console.log(data)
    }

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <Header title="Followers" color="black" goBack searchIcon={false} />

            <FlatList
                data={activity}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }} // ✅ Prevents last item from being cut off
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/user?user_id=${item.User.id}`)}
                        className="flex-row items-center justify-between p-4  rounded-lg mb-3"
                        activeOpacity={0.7} // ✅ Adds subtle press effect
                    >
                        {/* Icon */}
                        <View className="w-12 h-12 rounded-full flex items-center justify-center bg-black">
                            <Ionicons name="person" size={24} color="white" />
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className="text-base font-semibold text-black ">
                                {item?.User.username || 'Unknown User'}
                            </Text>
                            <Text>
                                {item.text || 'Liked your Video'}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                {item.created_at}
                            </Text>
                        </View>
                        {/* User ID */}


                        {/* Arrow Icon */}
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
