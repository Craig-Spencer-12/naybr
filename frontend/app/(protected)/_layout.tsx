import { useSession } from '@/utils/authContext';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';


SplashScreen.preventAutoHideAsync();

export default function ProtectedLayout() {

  const {session} = useSession()

  if (!session.isLoggedIn) {
    return <Redirect href="/login" />
  }

  return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
  );
}
