import SelectableList from '@/components/SelectableList'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { useSession } from '@/utils/authContext'
import { StyleSheet, View } from 'react-native'

export default function GenderScreen() {
    const { session } = useSession()
    const { updateProfileField: updateProfile } = useUpdateProfile()

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
                onSelect={(val) => updateProfile('gender', val)}
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
})
