import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
export default function VideoComponent({ video, isViewable }: { video: any; isViewable: boolean }) {
    const player = useVideoPlayer(video.signedUrl, (playerInstance) => {
        // Set loop on initialization
        playerInstance.loop = true;
    });

    const { user, likes, getLikes, followings, getFollowings } = useAuth();
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


    const likeVideo = async () => {
        const { error } = await supabase.from('Like').
            insert({
                video_id: video.id,
                user_id: user?.id,
                video_user_id: video.User.id
            })
        if (error) {
            console.error(error);
        } else {
            getLikes(user?.id);
        }
    };

    const unlikeVideo = async () => {
        const { error } = await supabase.from('Like').
            delete().
            eq('video_id', video.id).
            eq('user_id', user?.id)
        if (error) {
            console.error(error);
        } else {
            getLikes(user?.id);
        }
    };
    const openComments = () => {
        router.push(`/Comment?video_id=${video.id}`);
    };

    const followerUser = async () => {
        const { data, error } = await supabase.from('Follower')
            .insert({
                user_id: user?.id,
                follower_user_id: video.User.id
            })
        console.log(data)
        if (!error) {
            getFollowings(user?.id);
        } else {
            console.log(error)
        }
    };

    const unfollowerUser = async () => {
        const { data, error } = await supabase.from('Follower')
            .delete()
            .eq('user_id', user?.id)
            .eq('follower_user_id', video.User.id)
        console.log(data)
        if (!error) {
            getFollowings(user?.id);
        }
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
                        <View className=' items-center mb-2 justify-between'>
                            <TouchableOpacity  >
                                <Ionicons name="person" size={32} color="white" onPress={() => router.push(`/user?user_id=${video.User.id}`)} />
                            </TouchableOpacity>

                            {followings?.filter((following: any) => following.follower_user_id === video.User.id).length > 0 ?
                                (<TouchableOpacity className=' absolute -bottom-1 left-4 bg-white mt-1 rounded-full justify-center items-center' onPress={unfollowerUser} >
                                    <Ionicons name="remove" size={18} color="black" />
                                </TouchableOpacity>) : (<TouchableOpacity className=' absolute -bottom-1 left-4 bg-white mt-1 rounded-full justify-center items-center' onPress={followerUser} >
                                    <Ionicons name="add" size={18} color="black" />
                                </TouchableOpacity>)}
                            <Text className='absolute -bottom-7 font-extrabold  left-3 text-white text-xl'>{followings?.length}</Text>
                        </View>

                        {likes?.filter((like: any) => like.video_id === video.id).length > 0 ? (
                            <TouchableOpacity className='mt-6' onPress={unlikeVideo}>
                                <Ionicons name="heart" size={32} color="red" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity className='mt-6' onPress={likeVideo}>
                                <Ionicons name="heart" size={32} color="white" />
                            </TouchableOpacity>
                        )}


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
