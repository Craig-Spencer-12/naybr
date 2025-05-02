import { Urls } from "@/constants/Urls";
import { useSession } from "@/utils/authContext";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export default function BioScreen() {

    const { session, setSession } = useSession()
    const [ text, setText ] = useState(session.user.bio)

    async function changeBio(val: string) {
        const response = await fetch(Urls.postProfile + session.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "bio": val }),
        })

        if (response.ok) {
            setSession(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    bio: val
                }
            }))
        } else {
            Alert.alert("Error", "Failed to set bio")
        }
    }

    return (
        <View style={styles.stepContainer}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Enter Bio..."
                returnKeyType="done"
                onSubmitEditing={() => changeBio(text)}
                onBlur={() => changeBio(text)}
                autoCorrect={true}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />

            {/* <SelectableList
                options={[
                    { label: 'Manhattan', value: 'Manhattan' },
                    { label: 'Brooklyn', value: 'Brooklyn' },
                    { label: 'Queens', value: 'Queens' },
                    { label: 'Bronx', value: 'Bronx' },
                    { label: 'Staten Island', value: 'Staten Island' },
                ]}
                selectedValue={session.user.borough}
                onSelect={(val) => changeBio(val)}
            /> */}

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
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        color: '#fff'
      },
});
