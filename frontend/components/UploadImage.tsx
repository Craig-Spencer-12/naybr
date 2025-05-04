import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { usePickImage } from '@/hooks/usePickImage'

type Props = {
    defaultUri: string
    setFunction: React.Dispatch<React.SetStateAction<string>>
}

export default function UploadImageButton({
    defaultUri,
    setFunction,
}: Props) {
    const [imageUri, setImageUri] = useState<string | null>(defaultUri)
    const { selectActivityImage } = usePickImage()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => selectActivityImage(setImageUri, setFunction)} style={styles.buttonContainer}>
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
