import { Activity, LikeList, Profile, Session } from "@/types/Profile";

export const EmptyUser: Profile = {
    firstName: '',
    profilePhotoURL: '',
    age: 0,
    gender: '',
    borough: '',
    bio: '',
    activities: []
}

export const EmptySession: Session = {
    isLoggedIn: false,
    id: "",
    user: EmptyUser
}

export const EmptyActivity: Activity = {
    id: "",
    userID: "",
    title: "",
}

export const EmptyLikeList: LikeList = {likes: []}