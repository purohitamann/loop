import { View, Text, Touchable, TextInput } from 'react-native';
import '../../global.css';
import * as React from 'react';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
export default function SignupScreen() {
    const navigation = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const { signUp } = useAuth();
    const handleSignup = async () => {
        // const { data, error } = await supabase.auth.signUp({
        //     email: email,
        //     password: password
        // })
        // if (error) {
        //     return console.log(error)
        // }
        // const { errorUser } = await supabase.from('User').insert([{
        //     id: data?.user?.id, email: email, username: username
        // }])
        // if (errorUser) {
        //     return console.log(errorUser)
        // }
        signUp(username, email, password);
        navigation.back();
        navigation.navigate('/(tabs)');


    }
    /**
     * Handle the submission of the signup form by logging the input values.
     */
    // const handleSignup = () => {
    //     console.log('Login button clicked:', email, password);

    // }

    return (
        <View className='flex-1 justify-center items-center'>
            {/* <Text className='text-2xl font-bold'>Login</Text> */}
            {/* <Link href="/(tabs)">Register</Link> */}
            <View className='flex flex-col w-full p-4 '>
                <Text className='text-5xl font-bold text-center mb-4'>Signup</Text>
                <TextInput className='p-5 rounded-lg border-2 w-full border-gray-300 mb-4 placeholder:text-gray-400' placeholder='username' value={username} onChangeText={setUsername} />

                <TextInput className='p-5 rounded-lg border-2 w-full border-gray-300 mb-4 placeholder:text-gray-400' placeholder='email' value={email} onChangeText={setEmail} />
                <TextInput className='p-5 rounded-lg border-2 w-full border-gray-300 mb-4 placeholder:text-gray-400' placeholder='password' value={password} onChangeText={setPassword} />

                <TouchableOpacity className='p-5 text-center rounded-lg font-bold bg-black w-full ' onPress={handleSignup}>
                    <Text className='text-2xl text-white text-center font-bold'>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity className='p-3 text-center rounded-lg font-bold  w-full ' onPress={() => navigation.navigate('/(auth)')}>
                    <Text className='text-2xl text-Black text-center font-bold mt-3'>Login</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

