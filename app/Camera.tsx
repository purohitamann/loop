import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = React.useState(false);
    const cameraRef = React.useRef<CameraView>(null);
    const [video, setVideo] = React.useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();
    const source = {
        uri: video, resizeMode: 'contain'
    };
    const player = useVideoPlayer(source.uri, playerInstance => {
        playerInstance.loop = true;
        playerInstance.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    const recordVideo = async () => {

        if (recording) {
            setRecording(false);
            cameraRef.current?.stopRecording();
        } else {
            setRecording(true);
            const video = await cameraRef.current?.recordAsync();
            setVideo(video?.uri);
        }

        // setRecording(!recording);
    };
    const saveVideo = async () => {
        console.log('save video');
        const fileName = video?.split('/').pop();
        console.log(fileName);
        const formData = new FormData();
        formData.append('file', {
            uri: video,
            type: `test/${fileName?.split('.').pop()}`,
            name: fileName,

        })

        const { data, error } = await supabase.storage.
            from(`videos`).
            upload(`${fileName}`, formData);

        const { error: errorUser } = await supabase.from('Video').insert({
            title: "Test Title Here!",
            uri: data.path,
            user_id: user?.id
        })

        if (error) {
            console.error(error)
        }
        if (errorUser) {
            console.error(errorUser)
        }
        router.back();

    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });
        console.log("starting to pick image")
        setVideo(result.assets[0].uri);
        console.log(result.assets[0].uri)
        console.log("picked image")
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black', width: '100%', height: '100%' }}>
            {video ? <View style={{ flex: 1, backgroundColor: 'black' }}>
                <TouchableOpacity
                    onPress={() => {
                        isPlaying ? player.pause() : player.play();
                    }}
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                >
                    {/* Video View to occupy full screen */}
                    <VideoView
                        player={player}
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                        }}
                        allowsFullscreen
                        showsTimecodes
                        resizeMode="cover" // Ensures the video fills the screen
                    />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={saveVideo}
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        left: 158,

                        zIndex: 30,
                    }}
                >
                    <Ionicons name="checkmark-circle" size={90} color="white" />
                </TouchableOpacity>
            </View>

                : <View className='flex-1 bg-black'>
                    <CameraView mode='video' ref={cameraRef} style={styles.camera} facing={facing}>

                        <View style={styles.buttonContainer}>

                            <View className='flex-1 justify-end '>
                                <View className='flex-row justify-around'>
                                    <TouchableOpacity onPress={pickImage} className=''>
                                        <Ionicons name="aperture" size={49} color="white" />
                                    </TouchableOpacity>
                                    {video ? (
                                        <TouchableOpacity onPress={saveVideo} className=''>
                                            <Ionicons name="checkmark-circle" size={49} color="green" />
                                        </TouchableOpacity>
                                    ) : (
                                        !recording ? (
                                            <TouchableOpacity onPress={recordVideo} className=''>
                                                <Ionicons name="videocam" size={49} color="white" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={recordVideo} className=''>
                                                <Ionicons name="stop-circle" size={49} color="red" />
                                            </TouchableOpacity>
                                        )
                                    )}
                                    <TouchableOpacity onPress={toggleCameraFacing} className=''>
                                        <Ionicons name="camera-reverse-sharp" size={49} color="white" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </CameraView>
                </View>}
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
