import { useSession } from '@/utils/authContext'
import { Profile } from '@/types/Profile'
import { fetchProfile, fetchRandomId } from '@/api/fetchClient'

export function useGetRandomUser() {
    const { session } = useSession()

    async function getRandomUser(
        userId:string, 
        setUserId: React.Dispatch<React.SetStateAction<string>>,
        setProfile: React.Dispatch<React.SetStateAction<Profile>>
    ) {
        let randId = userId
        while (randId === userId || randId === session.id) {
            randId = await fetchRandomId()
        }
        setUserId(randId)

        const user = await fetchProfile(randId)
        setProfile(user)
    }

    return { getRandomUser }
}
