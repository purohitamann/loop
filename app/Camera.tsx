import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = React.useState(false);
    const cameraRef = React.useRef<CameraView>(null);
    const [video, setVideo] = React.useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();
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
        // if (video) {
        //     await cameraRef.current?.saveVideoToLibraryAsync(video);
        // }
    };

    return (
        <View style={styles.container}>
            <CameraView mode='video' ref={cameraRef} style={styles.camera} facing={facing}>

                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity> */}
                    <View className='flex-1 justify-end '>
                        <View className='flex-row justify-around'>
                            {video ? (
                                <TouchableOpacity onPress={saveVideo} className=''>
                                    <Ionicons name="checkmark-circle" size={49} color="white" />
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
