import { Urls } from "@/constants/Urls"
import { EmptySession } from "@/constants/Empty"
import { Profile } from "@/types/Profile"

export async function get(url: string): Promise<any> {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

export const fetchProfile = async (id: string): Promise<Profile> => {
    try {
        const res = await fetch(Urls.getProfile + id)
        const data: Profile = await res.json()
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
        return EmptySession.user
    }
}