import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import { supabase } from '@/utils/supabase';
import Profile from '@/components/profile'; // Ensure correct case
import { useAuth } from '@/providers/AuthProvider';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
export default function HomeScreen() {
    const pathname = useLocalSearchParams();
    const [user, setUser] = React.useState(null);

    console.log('Pathname:', pathname);
    const { getFollowers, getFollowings, followings, followers, getLikes, likes } = useAuth();
    const getUser = async () => {
        if (!pathname.user_id) return; // Prevent querying if user_id is undefined

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
        setUser(data);
        getFollowers(data.id);
        console.log('Followers:', followers);

        getFollowings(data.id);
        console.log('Followings:', followings);
        getLikes(data.id);
    };

    React.useEffect(() => {
        getUser();
    }, [pathname.user_id]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title={user?.username || "Loading..."} color="black" goBack={true} />
            <View className="flex-1">


                {user ? (
                    <Profile user={user} followers={followers} followings={followings} signOut={() => { }} likes={likes} />
                ) : (
                    <Text>Loading user...</Text> // Show loading text while fetching
                )}
            </View>
        </SafeAreaView>
    );
}
