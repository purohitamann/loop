import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import '../../global.css';
import { useAuth } from '@/providers/AuthProvider';
import Profile from '@/components/profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';
export default function HomeScreen() {

    const { signOut, followers, followings, likes, user, getFollowers, getFollowings, getLikes } = useAuth();
    const pathname = useLocalSearchParams();
    const [userA, setUserA] = React.useState(null);

    const getUser = async () => {
        // Prevent querying if user_id is undefined

        const { data, error } = await supabase
            .from('User') // Check table name in Supabase
            .select('*')
            .eq('id', pathname.user_id)
            .single();

        if (error) {
            console.error("Error fetching user:", error.message);
            return;
        }

        console.log("User Data:", data);
        setUserA(data);
        getFollowers(data.id);
        console.log('Followers:', followers.length);

        getFollowings(data.id);
        console.log('Followings:', followings.length);
        getLikes(data.id);
    };
    React.useEffect(() => {

        getUser(userA?.id);
    }, [userA?.id]);
    return (
        <SafeAreaView className="flex-1 bg-white">
            {user ? (
                <Profile user={user} signOut={signOut} followers={followers} followings={followings} likes={likes} />
            ) : (
                <Text className="text-center text-lg mt-10">Loading user...</Text>
            )}
        </SafeAreaView>
    );
}

