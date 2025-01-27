import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function VideoComponent({ video, isViewable }: { video: any; isViewable: boolean }) {
    const player = useVideoPlayer(video.signedUrl, (playerInstance) => {
        // Set loop on initialization
        playerInstance.loop = true;
    });

    const router = useRouter();
    React.useEffect(() => {
        // Dynamically play or pause based on viewability
        if (isViewable) {
            player.play();
        } else {
            player.pause();
        }
    }, [isViewable, player]);
    const shareVideo = async () => {
        await Share.share({

            message: `Yo loop to this ${video.title} by ${video.User.username}`,
        });
    };

    const openComments = () => {
        router.push('/Comment');
    };
    return (
        <View className='w-full h-full '>


            <View style={{ width: '100%', height: '100%' }}>
                <VideoView
                    player={player}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover" // Cover the entire container
                />
            </View>
            <View className='absolute bottom-20 right-0 left-0 mr-4 ml-4'>
                <View className='flex-1 flex-row justify-between items-end m-3'>
                    <View>
                        <Text className='text-white '>{video.title}</Text>
                        <Text className='text-white text-2xl'>{video.User.username}</Text>
                    </View>
                    <View className='' >
                        <TouchableOpacity>
                            <Ionicons name="person" size={32} color="white" onPress={() => router.push(`/user?user_id=${video.User.id}`)} />
                        </TouchableOpacity>
                        <TouchableOpacity className='mt-6'>
                            <Ionicons name="heart" size={32} color="white" />
                        </TouchableOpacity >
                        <TouchableOpacity className='mt-6' onPress={openComments}>
                            <Ionicons name="chatbubble" size={32} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className='mt-6' onPress={shareVideo}>
                            <Ionicons name="arrow-redo" size={32} color="white" />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        </View>
    );
}
