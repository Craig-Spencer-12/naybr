import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSession } from '@/utils/authContext'

type Props = {
    defaultUri: string
    setFunction: React.Dispatch<React.SetStateAction<string>>
}

export default function UploadImageButton({
    defaultUri,
    setFunction,
}: Props) {
    const [imageUri, setImageUri] = useState<string | null>(defaultUri)

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri)
            setFunction(result.assets[0].uri)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.buttonContainer}>
                {!imageUri || imageUri === "" ? (
                    <Image source={require('../assets/images/addImage.png')} style={styles.buttonImage} />
                ) : (
                    <Image source={{ uri: imageUri }} style={styles.buttonImage} />
                )}
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
