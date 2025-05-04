export type Profile = {
    firstName: string
    age: number
    gender: string
    borough: string
    activities: Activity[]
    bio: string
    profilePhotoURL: string
}

export type UpdatableProfileElement = 'borough' | 'gender' | 'bio'

export type Session = {
    isLoggedIn: boolean
    id: string
    user: Profile
}

export type Activity = {
    id: string
    userID: string
    title: string
}

export type Like = {
    likerId: string
    likedId: string
    activityId: string
}

export type ViewableLike = {
    userId: string
    name: string
}

export type LikeList = {
    likes: ViewableLike[]
}