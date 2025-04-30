import { Urls } from "@/constants/Urls";
import { Profile, Session } from "@/types/Profile"
import { createContext, useContext, useEffect, useState } from "react";

const initialSession: Session = {
    id: 'blah',
    user: {
        firstName: 'Init',
        age: 99,
        gender: 'F',
        borough: 'Queens',
        activities: [
            {
                title: 'Robot Making',
                photoURL: '3.png',
                id: '',
                userID: ''
            },
            {
                title: 'Surfing',
                photoURL: 'example.png',
                id: '',
                userID: ''
            }
        ],
        bio: 'This is the test bio',
        profilePhotoURL: '39022824-AD3A-47B0-8A2A-0576C50EFCA6.jpg'
    }
}

interface SessionContextType {
    session: Session;
    setSession: (session: Session) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a Provider');
    }
    return context
};

export function Provider({ children }: { children: React.ReactNode }) {

    const [session, setSession] = useState<Session>(initialSession)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const res = await fetch(Urls.getProfile + '3f07b805-d67c-4b8b-b214-bc72ca75ed78')
            const data: Profile = await res.json()
            const newSession: Session = { id: '3f07b805-d67c-4b8b-b214-bc72ca75ed78', user: data }
            setSession(newSession)
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    };


    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    )
}

// const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
//     providers.reduce((Prev, Curr) => ({ children }) => {
//       const Provider = Prev ? (
//         <Prev>
//           <Curr>{children}</Curr>
//         </Prev>
//       ) : (
//         <Curr>{children}</Curr>
//       )
//       return Provider
//     })

// const Providers = compose([
//     // UniversalThemeProvider,
//     // SafeAreaProvider,
//     // TamaguiProvider,
//     // ToastProvider,
//     // QueryClientProvider,
//     // GlobalStoreProvider,
//   ])