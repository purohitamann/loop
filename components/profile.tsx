import { View, Text, TouchableOpacity, Image } from 'react-native';

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
    const addImage = () => {
        console.log('Add Image');
    };

    return (
        <View className="flex-1 m-4">
            <View className="items-center">
                <TouchableOpacity onPress={addImage} className="p-2 rounded-lg">
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

            {user && (
                <TouchableOpacity onPress={signOut} className="bg-black mt-4 px-4 py-2 rounded-lg">
                    <Text className="text-lg font-bold text-white">Logout</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
