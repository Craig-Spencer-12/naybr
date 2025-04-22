export type Profile = {
    firstName: string,
    profilePhotoURL: string,
    age: number,
    gender: string,
    borough: string,
    bio: string,
    activities: Activity[]
}

export type Activity = {
    title: string,
    photoURL: string
}