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
        let data: Profile = await res.json()
        data.profilePhotoURL = id + "/profile-photo.jpg"
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
        return EmptySession.user
    }
}

export const uploadImage = async (folder: string, name: string, uri: string): Promise<boolean> => {
        const fileName = uri.split('/').pop() ?? 'upload.jpg'
        // const match = /\.(\w+)$/.exec(fileName)
        // const type = match ? `image/${match[1]}` : `image`

        const formData = new FormData()
        formData.append("folder", folder)
        formData.append('image', {
            uri: uri,
            name: name,
            // type: `image/${type}`,
            type: `image/jpeg`,
        } as any)

        try {
            let response = await fetch('http://192.168.1.209:8080/image', {
                method: 'POST',
                body: formData,
            })

            return response.ok

        } catch (err) {
            console.log('Upload error:', err)
            return false
        }
    }