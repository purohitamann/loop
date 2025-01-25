import { View, Text } from 'react-native';
import '../../global.css';
export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text className='text-2xl font-bold'>Camera</Text>
        </View>
    );
}

