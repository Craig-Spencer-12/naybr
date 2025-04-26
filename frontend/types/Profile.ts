export type Profile = {
    firstName: string,
    age: number,
    gender: string,
    borough: string,
    activities: Activity[]
    bio: string,
    profilePhotoURL: string,
}

export type EditProfile = {
    firstName: string,
    lastName: string,
    dob: string,
    gender: string,
    borough: string,
    activities: Activity[]
    bio: string,
    profilePhotoURL: string,
}

export type Activity = {
    id: string
    userId: string
    title: string
    photoURL: string
}

export type Like = {
    likerId: string
    likedId: string
    activityId: string
}