import { View, Text } from 'react-native';
import '../global.css';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase';
import { ScrollView } from 'react-native';
import UserBanner from '@/components/UserBanner';
export default function HomeScreen() {
    const { user } = useAuth();
    const [text, setText] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const SearchBar = async (text: string) => {
        const { data, error } = await supabase.from('User').select('*').eq('username', text);
        if (error) {
            return console.log(error)
        }
        setSearchResults(data);
    }
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <Header title='Search' color='black' goBack={true} />
            <View className='flex-row items-center p-4'>


                <TextInput className='flex-1 p-4 mr-2 rounded-lg border-2 border-gray-300'
                    value={text}
                    onChangeText={(i) => setText(i)}
                    placeholder="Search"
                />
                <TouchableOpacity className='bg-black p-3 rounded-lg'
                    onPress={() => SearchBar(text)}
                >
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {searchResults && searchResults.map((user: any) => (
                    <UserBanner key={user.id} user={user} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

