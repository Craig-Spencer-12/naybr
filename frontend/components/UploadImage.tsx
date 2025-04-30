import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

type Props = {
  defaultUri: string
  setFunction?: React.Dispatch<React.SetStateAction<string>>
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
            uploadImage(result.assets[0].uri)
        }
    }

    const uploadImage = async (uri: string): Promise<boolean> => {
        const fileName = uri.split('/').pop() ?? 'upload.jpg'
        const match = /\.(\w+)$/.exec(fileName)
        const type = match ? `image/${match[1]}` : `image`

        const formData = new FormData()
        formData.append('image', {
            uri: uri,
            name: fileName,
            type: `image/${type}`,
        } as any)

        try {
            let response = await fetch('http://192.168.1.209:8080/image', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                setImageUri(fileName)
                if (setFunction) {
                    setFunction(fileName)
                }
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
                {!imageUri || imageUri === "" ? (
                    <Image source={require('../assets/images/addImage.png')} style={styles.buttonImage} />
                ) : (
                    <Image source={{ uri: "http://192.168.1.209:8080/image/"+imageUri }} style={styles.buttonImage} />
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
