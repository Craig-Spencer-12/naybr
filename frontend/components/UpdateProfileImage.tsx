import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSession } from '@/utils/authContext'
import { Urls } from '@/constants/Urls'

export default function UpdateProfileImage() {

    const { session, setSession } = useSession()

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled && result.assets.length > 0) {
            uploadImage(result.assets[0].uri)
        }
    }

    const uploadImage = async (uri: string): Promise<boolean> => {
        const fileName = uri.split('/').pop() ?? 'upload.jpg'
        const match = /\.(\w+)$/.exec(fileName)
        const type = match ? `${match[1]}` : `image`

        const fileName2 = session.id + "_profile-photo." + type

        const formData = new FormData()
        formData.append('image', {
            uri: uri,
            name: fileName2,
            type: `image/${type}`,
        } as any)

        try {
            let response = await fetch('http://192.168.1.209:8080/image', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                setSession(prev => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        profilePhotoURL: fileName2+`?t=${Date.now()}`
                    }
                }))
            }

            return response.ok

        } catch (err) {
            console.log('Upload error:', err)
            return false
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
