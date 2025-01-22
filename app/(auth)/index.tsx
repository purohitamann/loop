import { View, Text, Touchable } from 'react-native';
import '../../global.css';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
export default function HomeScreen() {
    const navigation = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text className='text-2xl font-bold'>Login</Text> */}
            {/* <Link href="/(tabs)">Register</Link> */}
            <TouchableOpacity className='p-4 rounded-lg font-bold bg-black' onPress={() => navigation.push('/(tabs)')}>
                <Text className='text-2xl text-white font-bold'>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

