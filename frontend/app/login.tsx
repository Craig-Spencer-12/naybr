import { ThemedText } from '@/components/ThemedText'
import { useSession } from '@/utils/authContext'
import { Button, View } from 'react-native'

export default function LoginScreen() {
    const { logIn } = useSession()

    return (
        <View>
            <ThemedText type='subtitle'>Login Screen</ThemedText>
            <Button title='Login' onPress={() => logIn('3f07b805-d67c-4b8b-b214-bc72ca75ed78')}></Button>
        </View>
    )
}

// TODO replace hard coded id with login flow
// George     | 0d2a7862-4443-4046-bde4-71f8cbb9e5b7
// Craig      | 3f07b805-d67c-4b8b-b214-bc72ca75ed78
// Zach       | ebb97356-8167-4fd4-90e9-99bfb6d47489
// John       | cb5031eb-efd0-4994-8d52-be5a7f27009e
// Ava        | 07860af2-bccd-4132-a001-2e85c86173eb