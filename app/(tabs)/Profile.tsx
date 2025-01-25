import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import '../../global.css';
import { useAuth } from '@/providers/AuthProvider';
export default function HomeScreen() {
    const { user } = useAuth();
    const { signOut } = useAuth();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text className='text-2xl font-bold'>Profile</Text>
            <Text className='text-lg'>Welcome {user?.username || ''}</Text>
            <TouchableOpacity onPress={signOut} className='bg-black p-2 rounded-lg'>
                <Text className='text-lg font-bold text-white'>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

