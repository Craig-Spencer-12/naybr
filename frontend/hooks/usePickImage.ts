import { useSession } from '@/utils/authContext'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Urls } from '@/constants/Urls'
import { fetchUploadImage } from '@/api/fetchClient'

async function pickImage(): Promise<string> {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
        return result.assets[0].uri
    }

    console.warn("Image picker failed")
    return ''
}

export function usePickImage() {
    const { session, setSession } = useSession()

    async function setProfileImage() {
        const imageUri = await pickImage()
        const ok = await fetchUploadImage(session.id, Urls.profilePhoto, imageUri)

        if (ok) {
            setSession(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    profilePhotoURL: `${prev.id}/${Urls.profilePhoto}?t=${Date.now()}`
                }
            }))
        }
    }

    async function selectActivityImage(
        setImageUri: React.Dispatch<React.SetStateAction<string | null>>,
        setFunction: React.Dispatch<React.SetStateAction<string>>
    ) {
        const imageUri = await pickImage()
        setImageUri(imageUri)
        setFunction(imageUri)
    }

    return { setProfileImage, selectActivityImage }
}