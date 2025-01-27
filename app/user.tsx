import { SafeAreaView, View, Text, Touchable, TouchableOpacity } from 'react-native';
import '../global.css';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

export default function HomeScreen() {
    const pathname = useLocalSearchParams();
    console.log(pathname);

    return (
        <SafeAreaView >

            <Header title="User" color="black" goBack={true} />


            <Text>UsERNAME HERE</Text>
        </SafeAreaView>
    );
}

