import { useSession } from '@/utils/authContext'
import { Redirect, Stack } from 'expo-router'
import 'react-native-reanimated'

export default function ProtectedLayout() {

  const { session } = useSession()

  if (!session.isLoggedIn) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
