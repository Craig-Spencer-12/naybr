import EditableText from "@/components/EditableText";
import SelectableList from "@/components/SelectableList";
import UploadImageButton from "@/components/UploadImage";
import { StyleSheet, Text, View } from "react-native";

export default function GenderScreen() {
    return (
        <View style={styles.stepContainer}>

            <EditableText initialValue="Activity Title" onSave={(val) => console.log('Saved:', val)} />

            <UploadImageButton defaultUri={"../../../assets/images/icon.png"} />

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
