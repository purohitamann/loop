import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
export default function Header({ title, color, goBack = false, searchIcon = false }: { title: string, color: string, goBack?: boolean, searchIcon?: boolean }) {
    const navigation = useRouter();
    const search = () => {
        router.push('/Search');
    }
    return (
        <View className='flex-row items-center justify-between h-16 p-4'>
            <View className='w-10'>
                {goBack && <TouchableOpacity onPress={() => navigation.back()}>
                    <Ionicons name="arrow-back" size={24} color={`${color}`} />
                </TouchableOpacity>}
            </View>

            <Text className={`text-2xl font-bold text-${color}`}>{title}</Text>
            <View className='w-10'>
                {searchIcon && <TouchableOpacity onPress={search}>
                    <Ionicons name="search" size={24} color={`${color}`} />
                </TouchableOpacity>}
            </View>

        </View>
    );
}