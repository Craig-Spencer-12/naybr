import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { useSession } from '@/utils/authContext'
import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export default function BioScreen() {
    const { session } = useSession()
    const { updateProfileField: updateProfile } = useUpdateProfile()
    const [ text, setText ] = useState(session.user.bio)

    return (
        <View style={styles.stepContainer}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder='Enter Bio...'
                returnKeyType='done'
                onSubmitEditing={() => updateProfile('bio', text)}
                onBlur={() => updateProfile('bio', text)}
                autoCorrect={true}
                multiline={true}
                numberOfLines={4}
                textAlignVertical='top'
                submitBehavior='blurAndSubmit'
            />
        </View>
    )
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
})
