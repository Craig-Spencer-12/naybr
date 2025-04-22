export type Profile = {
    firstName: string,
    age: number,
    gender: string,
    borough: string,
    activities: Activity[]
    bio: string,
    profilePhotoURL: string,
}

export type Activity = {
    title: string,
    photoURL: string
}