import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSession } from '@/utils/authContext'
import { Urls } from '@/constants/Urls'
import { uploadImage } from '@/api/fetchClient'

export default function UpdateProfileImage() {

    const { session, setSession } = useSession()

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        })

        const fileName = "profile-photo.jpg"

        if (!result.canceled && result.assets.length > 0) {
            const ok = await uploadImage(session.id, fileName, result.assets[0].uri)

            if (ok) {
                setSession(prev => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        profilePhotoURL: `${session.id}/${fileName}?t=${Date.now()}`
                    }
                }))
            }
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.buttonContainer}>
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
