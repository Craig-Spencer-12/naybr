// import { Session } from "@/types/Profile"

// export type AuthProviderProps = {
//     initialSession?: Session | null
//     children?: React.ReactNode
// }

// export const AuthProvider = ({ initialSession, children }: AuthProviderProps) => {
//     // Create a new supabase browser client on every first render.
//     // const [supabaseClient] = useState(() => createPagesBrowserClient<Database>())

//     return (
//         <SessionContextProvider initialSession={initialSession}>
//             {children}
//         </SessionContextProvider>
//     )
// }