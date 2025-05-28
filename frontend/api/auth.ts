


// // const supabaseUrl = 'https://your-project.supabase.co'
// // const supabaseAnonKey = 'your-anon-key'
// // TODO: Change these to use env variables

// type ExtraConfig = {
//     supabaseKey: string
//     supabaseUrl: string
// }


// const supabase = createClient(supabaseUrl, supabaseKey)

export function authLogin() {
    // console.log("SUPADUPA TEST", supabaseUrl, supabaseKey)
    
}


import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient} from '@supabase/supabase-js'
import Constants from 'expo-constants'

const { supabaseUrl, supabaseKey } = Constants.expoConfig?.extra ?? {}
// const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
// const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    a
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

