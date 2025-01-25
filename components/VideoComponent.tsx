import React from 'react';
import { View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

export default function VideoComponent({ video, isViewable }: { video: any; isViewable: boolean }) {
    const player = useVideoPlayer(video.signedUrl, (playerInstance) => {
        // Set loop on initialization
        playerInstance.loop = true;
    });

    React.useEffect(() => {
        // Dynamically play or pause based on viewability
        if (isViewable) {
            player.play();
        } else {
            player.pause();
        }
    }, [isViewable, player]);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <VideoView
                player={player}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover" // Cover the entire container
            />
        </View>
    );
}
