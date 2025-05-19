import { Urls } from "@/constants/Urls"
import { EmptyActivity, EmptyConnectionList, EmptySession } from "@/constants/Empty"
import { Activity, Connection, ConnectionList, connectionType, Profile, UpdatableProfileElement } from "@/types/Profile"

export async function fetchGeneric(url: string): Promise<any> {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

export async function fetchConnections(id: string, likeOrMatch: connectionType): Promise<ConnectionList> {
    const url = (likeOrMatch == 'like') ? Urls.likes : Urls.matches
    
    try {
        const res = await fetch(`${url}/${id}`)
        const data = await res.json()

        const parsedList: ConnectionList = {
            connections: data.list.map((item: any) => ({
                userId: item.userId,
                name: item.firstName,
            })),
        }

        return parsedList

    } catch (err) {
        console.log(`Error: ${err}`)
        return EmptyConnectionList
    }
}

export const fetchProfile = async (id: string): Promise<Profile> => {
    try {
        const res = await fetch(Urls.user + id)
        let data: Profile = await res.json()
        data.profilePhotoURL = `${id}/${Urls.profilePhoto}`
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
        return EmptySession.user
    }
}

export const fetchUploadImage = async (folder: string, name: string, uri: string): Promise<boolean> => {
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

export const fetchRandomId = async (): Promise<string> => {
    try {
        const res = await fetch(Urls.randomUser)
        return JSON.parse(await res.text())
    } catch (err) {
        console.log(`Error: ${err}`)
        return ""
    }
}

export const fetchUpdateProfile = async (id: string, key: UpdatableProfileElement, value: string): Promise<boolean> => {
    try {
        const response = await fetch(Urls.user + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [key]: value }),
        })

        return response.ok
    } catch (err) {
        console.log(`Error: ${err}`)
        return false
    }
}

export const fetchPostActivity = async (id: string, title: string): Promise<Activity> => {
    const activity: Activity = {
        id: '',
        userID: id,
        title: title,
    }

    try {
        const res = await fetch(Urls.activities, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity),
        })

        return res.json()

    } catch (err) {
        console.log(`Error: ${err}`)
    }

    return EmptyActivity
}

export const fetchPostLike = async (likerId: string, activity: Activity): Promise<boolean> => {
    const like: Connection = {
        likerId: likerId,
        likedId: activity.userID,
        activityId: activity.id
    }

    try {
        const res = await fetch(Urls.likes, {
            method: 'POST',
            body: JSON.stringify(like),
        })

        return res.ok

    } catch (err) {
        console.log(`Error: ${err}`)
    }

    return false
}