import UploadImageButton from "@/components/UploadImage";
import { Urls } from "@/constants/Urls";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Activity } from '@/types/Profile'
import { useSession } from "@/utils/authContext";
import { uploadImage } from "@/api/fetchClient";
import { v4 as uuidv4 } from 'uuid';
import { EmptyActivity, EmptySession } from "@/constants/Empty";


export default function NewActivityScreen() {
    const [text, setText] = useState('')
    const [imageUri, setImageUri] = useState('')
    const { session, setSession } = useSession()

    const navigation = useNavigation();


    const postActivity = async (): Promise<Activity> => {
        const activity: Activity = {
            id: "",
            userID: session.id,
            title: text,
        }

        let newActivity: Activity = EmptyActivity
        // setLoading(true);
        try {
            const res = await fetch(Urls.postActivity, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity),
            })

            if (res.ok) {
                newActivity = await res.json()
            } else {
                Alert.alert("Error", "Failed to post activity")
            }
        } catch (err) {
            console.log(`Error: ${err}`)
        } finally {
            //   setLoading(false)
        }

        return newActivity
    };

    const submitActivity = async () => {
        const activity = await postActivity()
        console.log(`The Id id: ${activity.id}`)
        const ok = await uploadImage(session.id, activity.id + ".jpg", imageUri)

        if (ok && activity) {
            setSession(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    activities: [...(prev.user.activities ?? []), activity]
                }
            }))

            navigation.navigate("MainTabs" as never)
        }
    }

    return (
        <View style={styles.pageContainer}>
            <TextInput
                style={styles.input}
                placeholder="New Activity Title"
                value={text}
                onChangeText={setText}
            />
            <View style={styles.uploadButton}>
                <UploadImageButton defaultUri={""} setFunction={setImageUri} />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={submitActivity}>
                    <Text style={styles.buttonText}>Create Activity</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        backgroundColor: '#007AFF', // iOS blue color
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    input: {
        width: '90%',
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: '#444',
        color: '#fff',
        marginTop: 40,
        marginBottom: 40,
    },
    pageContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    titleBox: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    uploadButton: {
        width: '90%',
        aspectRatio: 1, // Makes it a square
        borderRadius: 20,
        overflow: 'hidden', // Makes sure image and touch area respect rounded corners
        backgroundColor: '#f0f0f0', // Placeholder background color until image loads
        justifyContent: 'center',
        alignItems: 'center',
    },
});
