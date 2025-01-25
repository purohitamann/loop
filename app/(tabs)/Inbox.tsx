import { View, Text } from 'react-native';
import '../../global.css';
import { useAuth } from '@/providers/AuthProvider';
export default function HomeScreen() {
    const { user } = useAuth();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text className='text-2xl font-bold'>Inbox</Text>
            <Text className='text-lg'>Welcome to the Inbox</Text>
            <Text className='text-lg'>Welcome {JSON.stringify(user)}</Text>

        </View>
    );
}

