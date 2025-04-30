import { Session, Profile, EditProfile } from "@/types/Profile"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useRouter } from "expo-router"
import { Urls } from "@/constants/Urls"

type AuthState = {
    session: Session
    setSession: React.Dispatch<React.SetStateAction<Session>>
    logIn: (id: string) => void
    logOut: () => void
}

const emtpySession: Session = {
    isLoggedIn: false,
    id: "",
    user: {
        firstName: "",
        age: 0,
        gender: "",
        borough: "",
        activities: [],
        bio: "",
        profilePhotoURL: ""
    }
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useSession = (): AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useSession must be used within a Provider');
    }
    return context
}

const fetchProfile = async (id: string): Promise<Profile> => {
    try {
        const res = await fetch(Urls.getProfile + id)
        const data: Profile = await res.json()
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
        return emtpySession.user
    }
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState(emtpySession)
    const router = useRouter()

    const logIn = async (id: string) => {
        let user = await fetchProfile(id)
        setSession({
            id: id,
            user: user,
            isLoggedIn: true
        })
        router.replace("/")
    }

    const logOut = () => {
        setSession(emtpySession)
        router.replace("/login")
    }

    return (
        <AuthContext.Provider value={{ session, setSession, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}