import { Alert } from 'react-native'
import { useSession } from '@/utils/authContext'
import { UpdatableProfileElement } from '@/types/Profile'
import { fetchPostActivity, fetchUpdateProfile, fetchUploadImage } from '@/api/fetchClient'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export function useUpdateProfile() {
    const { session, setSession } = useSession()

    async function updateProfileField(
        key: UpdatableProfileElement,
        value: string
    ) {

        const ok = await fetchUpdateProfile(session.id, key, value)

        if (ok) {
            setSession((prev) => ({
                ...prev,
                user: {
                    ...prev.user,
                    [key]: value,
                },
            }))
        } else {
            Alert.alert('Error', `Failed to set ${key}`)
        }
    }

    async function submitActivity(
        title: string,
        imageUri: string,
    ) {

        const activity = await fetchPostActivity(session.id, title)
        if (!activity) {
            Alert.alert('Error', 'Failed to post activity')
        }

        const ok = await fetchUploadImage(session.id, activity.id + '.jpg', imageUri)
        if (ok && activity) {
            setSession(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    activities: [...(prev.user.activities ?? []), activity]
                }
            }))
        }
    }

    return { updateProfileField, submitActivity }
}
