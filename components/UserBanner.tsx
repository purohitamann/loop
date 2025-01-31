
import { View, Text, Image } from 'react-native';

export default function UserBanner({ user }: { user: any }) {
    return (
        <View className='flex-row items-center p-4'>
            <Image source={{ uri: user.avatar_url }} className='w-12 h-12 rounded-full' />
            <Text className='text-lg font-bold ml-2'>{user.username}</Text>
        </View>
    );
}