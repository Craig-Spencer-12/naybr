export type Profile = {
    firstName: string,
    gender: string,
    borough: string,
    activities: Activity[]
}

export type Activity = {
    title: string,
    photoURL: string
}