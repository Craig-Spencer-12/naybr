// import React from 'react'
// import { Button } from 'react-native'
// import * as ImagePicker from 'expo-image-picker'

// export default function UploadImageButton() {

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       allowsEditing: true,
//       quality: 1,
//     })

//     if (!result.canceled && result.assets.length > 0) {
//         uploadImage(result.assets[0].uri)
//     }
//   }

//   const uploadImage = async (uri: string) => {
//     const fileName = uri.split('/').pop() ?? 'upload.jpg'

//     const formData = new FormData()
//     formData.append('image', {
//       uri: uri,
//       name: fileName,
//       type: "image/jpeg",
//     } as any)

//     try {
//       await fetch('http://192.168.1.209:8080/image', {
//         method: 'POST',
//         body: formData,
//       })

//     } catch (err) {
//       console.log('Upload error:', err)
//     }
//   }

//   return <Button title="Upload Image" onPress={pickImage} />
// }


import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

type Props = {
  defaultUri: string
}

export default function UploadImageButton({
    defaultUri,
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
                {imageUri ? (
                    <Image source={{ uri: "http://192.168.1.209:8080/image/"+imageUri }} style={styles.buttonImage} />
                ) : (
                    <Image source={require('../assets/images/icon.png')} style={styles.buttonImage} />
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
        height: 200,
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
