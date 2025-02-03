import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import '../../global.css';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
export default function HomeScreen() {
    const { user, friends } = useAuth();
    const [friend, setfriend] = React.useState([]);
    const router = useRouter();
    const getUser = async () => {
        const { data, error } = await supabase.from('User').select('*').eq('id', friends);
        if (error) {
            return console.log(error)
        }
        setfriend(data)
    }
    React.useEffect(() => {
        getUser()
    }, [])

    return (
        <SafeAreaView className='flex-1 p-4 bg-white'>
            <View className='flex items-center m-4'>
                <Text className='text-2xl font-bold'>Inbox</Text>

                <View className='mt-4 w-full h-96'>
                    <TouchableOpacity
                        onPress={() => router.push('/Followers')}

                        className='flex-row items-center'>
                        <View className='w-12 h-12 rounded-full bg-blue-400 items-center justify-center'>
                            <Ionicons name="people" size={24} color="white" />
                        </View>
                        <View className='flex-1 ml-4'>
                            <Text className='font-bold text-base'>New Followers</Text>
                            <Text>Say hi!</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/Activity')}

                        className='flex-row mt-3 items-center'>
                        <View className='w-12 h-12 rounded-full bg-red-400 items-center justify-center'>
                            <Ionicons name="time" size={24} color="white" />
                        </View>
                        <View className='flex-1 ml-4'>
                            <Text className='font-bold text-base'>Activity</Text>
                            <Text>See what's other people are up to</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>1
                    <FlatList
                        data={friend}
                        keyExtractor={(item) => item.id}
                        className='flex-1 w-1/3'
                        contentContainerStyle={{ paddingBottom: 20 }} // ✅ Prevents last item from being cut off
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => router.push(`/user?user_id=${item.id}`)}
                                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-3"
                                activeOpacity={0.7} // ✅ Adds subtle press effect
                            >
                                {/* Icon */}
                                <View className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500">
                                    <Ionicons name="people" size={24} color="white" />
                                </View>

                                {/* User ID */}
                                <Text className="text-base font-semibold text-black flex-1 ml-4">
                                    {item?.username || 'Unknown User'}
                                </Text>

                                {/* Arrow Icon */}

                            </TouchableOpacity>
                        )}
                    />

                </View>



            </View >


        </SafeAreaView >
    );
}

