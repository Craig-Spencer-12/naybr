import SelectableList from "@/components/SelectableList";
import { Urls } from "@/constants/Urls";
import { useSession } from "@/utils/authContext";
import { Alert, StyleSheet, View } from "react-native";
export default function GenderScreen() {
    const { session, setSession } = useSession()

    async function changeGender(val: string) {
        const response = await fetch(Urls.postProfile + session.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"gender": val}),
          })
    
        if (response.ok) {
            setSession(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    gender: val
                }
            }))
        } else {
            Alert.alert("Error", "Failed to set gender")
        }
    }

    return (
        <View style={styles.stepContainer}>

            <SelectableList
                options={[
                    { label: 'Male', value: 'M' },
                    { label: 'Female', value: 'F' },
                    { label: 'Non-Binary', value: 'N' },
                    { label: 'Other', value: 'O' },
                ]}
                selectedValue={session.user.gender}
                onSelect={(val) => changeGender(val)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff'
    },
    titleContainer: {
        color: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        color: '#ffffff',
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
