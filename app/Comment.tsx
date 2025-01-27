import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import '../global.css';
import { useAuth } from '@/providers/AuthProvider';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
type Comment = {
    id: string;
    videoId: string;
    user_id: string;
    text: string;
};

export default function HomeScreen() {
    const { user } = useAuth();
    const params = useLocalSearchParams();
    const [comments, setComments] = React.useState<Comment[]>([])
    const [text, setText] = React.useState('');

    React.useEffect(() => {
        getComments()
    }, [])
    const getComments = async () => {
        const { data, error } = await supabase.from('Comment').select('*, User(*)').eq('videoId', params.video_id)
        if (error) {
            return console.log(error)
        }
        setComments(data)


    }

    const addComment = async () => {
        const { error } = await supabase.from('Comment').insert({
            videoId: params.video_id,
            user_id: user?.id,
            text: text
        })
        if (error) {

            return console.log(error)

        }
        getComments()
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Comments</Text>

            <FlatList
                className='w-full'
                data={comments} renderItem={
                    ({ item }) => {
                        return (
                            <View className='flex-row items-center w-full p-4' style={{ borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }}>
                                <View className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center'>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.User.username.slice(0, 2).toUpperCase()}</Text>
                                </View>
                                <Text className='ml-4'>{item.User.username}</Text>
                                <Text className='ml-4'>{item.text}</Text>
                            </View>
                        );
                    }
                }

            />
            <View className='w-full gap-x-3 flex-1 flex-row items-center'>


                <TextInput className='flex-1 p-4 rounded-lg border-2 border-gray-300' placeholder="Add Comment" value={text} onChangeText={(i) => setText(i)}
                    onSubmitEditing={addComment} />
                <TouchableOpacity onPress={addComment} className='bg-black p-2 rounded-lg'>
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

