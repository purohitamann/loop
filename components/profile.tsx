import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';

export default function Profile({
    user,
    signOut,
    followers,
    followings,
    likes,
}: {
    user: any;
    signOut: any;
    followers: any;
    followings: any;
    likes: any;
}) {
    const { user: authUser, followings: followingsAuth, getFollowings } = useAuth();

    // Check if the logged-in user is following this profile
    const isFollowing = followingsAuth?.some((f: any) => f.user_id === user?.id);

    const followUser = async () => {
        if (!authUser?.id || !user?.id) return;
        const { error } = await supabase.from('Follower').insert({
            user_id: user.id,
            follower_user_id: authUser.id
        });

        if (!error) {
            console.log(`Followed ${user.id}`);
            getFollowings(authUser.id); // Refresh following list
        } else {
            console.error("Error following user:", error.message);
        }
    };

    const unfollowUser = async () => {
        if (!authUser?.id || !user?.id) return;
        const { error } = await supabase.from('Follower')
            .delete()
            .eq('user_id', user.id)
            .eq('follower_user_id', authUser.id);

        if (!error) {
            console.log(`Unfollowed ${user.id}`);
            getFollowings(authUser.id); // Refresh following list
        } else {
            console.error("Error unfollowing user:", error.message);
        }
    };

    return (
        <View className="flex-1 m-4">
            <View className="items-center">
                <TouchableOpacity onPress={() => console.log('Add Image')} className="p-2 rounded-lg">
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                        }}
                        className="w-20 h-20 rounded-full"
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">@{user?.username || 'webdev'}</Text>
            </View>

            <View className="flex-row items-center justify-around mt-4">
                <View className="flex items-center">
                    <Text className="text-lg font-bold">Following</Text>
                    <Text className="text-lg">{followings?.length ?? 0}</Text>
                </View>
                <View className="flex items-center">
                    <Text className="text-lg font-bold">Followers</Text>
                    <Text className="text-lg">{followers?.length ?? 0}</Text>
                </View>
                <View className="flex items-center">
                    <Text className="text-lg font-bold">Likes</Text>
                    <Text className="text-lg">{likes?.length ?? 0}</Text>
                </View>
            </View>

            {/* Logout / Follow / Unfollow Buttons */}
            <View className="mt-4">
                {user?.id === authUser?.id ? (
                    <TouchableOpacity onPress={signOut} className="bg-black px-4 py-2 rounded-lg">
                        <Text className="text-lg font-bold text-white">Logout</Text>
                    </TouchableOpacity>
                ) : isFollowing ? (
                    <TouchableOpacity
                        className="bg-red-500 mt-2 px-4 py-2 rounded-full items-center"
                        onPress={unfollowUser}
                    >
                        <Text className="text-lg font-bold text-white">Unfollow</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        className="bg-blue-500 mt-2 px-4 py-2 rounded-full items-center"
                        onPress={followUser}
                    >
                        <Text className="text-lg font-bold text-white">Follow</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
