import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSession } from '@/utils/authContext'
import { Urls } from '@/constants/Urls'
import { fetchUploadImage } from '@/api/fetchClient'
import { usePickImage } from '@/hooks/usePickImage'

export default function UpdateProfileImage() {

    const { session, setSession } = useSession()
    const { setProfileImage } = usePickImage()

    // const pickImage = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ['images'],
    //         allowsEditing: true,
    //         quality: 1,
    //     })

    //     if (!result.canceled && result.assets.length > 0) {
    //         const ok = await fetchUploadImage(session.id, Urls.profilePhoto, result.assets[0].uri)

    //         if (ok) {
    //             setSession(prev => ({
    //                 ...prev,
    //                 user: {
    //                     ...prev.user,
    //                     profilePhotoURL: `${session.id}/${Urls.profilePhoto}?t=${Date.now()}`
    //                 }
    //             }))
    //         }
    //     }
    // }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={setProfileImage} style={styles.buttonContainer}>
                <Image source={{ uri: Urls.minio + session.user.profilePhotoURL, cache: 'reload' }} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        height: 400,
        // borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ccc',
    },
    buttonImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})
