import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import '../../global.css';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function HomeScreen() {
    const { user } = useAuth();
    const [messages, setMessages] = React.useState([]);
    const router = useRouter();
    return (
        <SafeAreaView className='flex-1 p-4 bg-white'>
            <View className='flex items-center m-4'>
                <Text className='text-2xl font-bold'>Inbox</Text>

                <ScrollView className='mt-4 w-full h-96'>
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
                    </TouchableOpacity>


                </ScrollView>



            </View >


        </SafeAreaView >
    );
}

