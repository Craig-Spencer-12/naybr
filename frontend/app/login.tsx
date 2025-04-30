import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/utils/authContext";
import { Button, View } from "react-native";

export default function LoginScreen() {
    const {logIn} = useSession()

    return (
        <View>
            <ThemedText type="subtitle">Login Screen</ThemedText>
            <Button title="Login" onPress={() => logIn('3f07b805-d67c-4b8b-b214-bc72ca75ed78')}></Button>
        </View>
    )

    // TODO replace hard coded id with login flow
}