import { Session } from "@/types/Profile"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useRouter } from "expo-router"
import { EmptySession } from "@/constants/Empty"
import { fetchProfile } from "@/api/fetchClient"


type AuthState = {
    session: Session
    setSession: React.Dispatch<React.SetStateAction<Session>>
    connectionInViewID: string
    setConnectionInViewID: (id: string) => void
    logIn: (id: string) => void
    logOut: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useSession = (): AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useSession must be used within a Provider');
    }
    return context
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState(EmptySession)
    const [connectionInViewID, setConnectionInViewID] = useState("")
    const router = useRouter()


    const logIn = async (id: string) => {
        let user = await fetchProfile(id)
        setSession({
            id: id,
            user: user,
            isLoggedIn: true,
        })
        router.replace("/")
    }

    const logOut = () => {
        setSession(EmptySession)
        router.replace("/login")
    }

    return (
        <AuthContext.Provider 
            value={{ session, setSession, connectionInViewID, setConnectionInViewID, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}