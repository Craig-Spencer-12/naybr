export type Profile = {
    firstName: string,
    age: number,
    gender: string,
    borough: string,
    activities: Activity[]
}

export type Activity = {
    title: string,
    photoURL: string
}