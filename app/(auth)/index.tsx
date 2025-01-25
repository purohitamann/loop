import { View, Text, Touchable, TextInput } from 'react-native';
import '../../global.css';
import * as React from 'react';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useAuth, AuthContext } from '@/providers/AuthProvider';
export default function HomeScreen() {
    const navigation = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = useAuth();
    const handleLogin = async () => {
        // const { data, error } = await supabase.auth.signInWithPassword({
        //     email: email,
        //     password: password
        // })
        // console.log(data)
        // if (error) {
        //     return console.log(error)
        // }
        // navigation.back();
        // navigation.navigate('/(tabs)');
        signIn(email, password);
    }

    return (
        <View className='flex-1 justify-center items-center'>
            {/* <Text className='text-2xl font-bold'>Login</Text> */}
            {/* <Link href="/(tabs)">Register</Link> */}
            <View className='flex flex-col w-full p-4 '>
                <Text className='text-5xl font-bold text-center mb-4'>Login</Text>
                <TextInput className='p-5 rounded-lg border-2 w-full border-gray-300 mb-4' placeholder='email' value={email} onChangeText={setEmail} />
                <TextInput className='p-5 rounded-lg border-2 w-full border-gray-300 mb-4' placeholder='password' value={password} onChangeText={setPassword} />

                <TouchableOpacity className='p-4 text-center rounded-lg font-bold bg-black w-full ' onPress={handleLogin}>
                    <Text className='text-2xl text-white text-center font-bold'>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity className='p-3 text-center rounded-lg font-bold  w-full ' onPress={() => navigation.navigate('/(auth)/signup')}>
                    <Text className='text-2xl text-Black text-center font-bold mt-3'>Signup</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

