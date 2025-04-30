import SelectableList from "@/components/SelectableList";
import { StyleSheet, Text, View } from "react-native";

async function changeBorough(val: string) {
    await fetch("http://192.168.1.209:8080/user", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"borough": val}),
      })
}

export default function BoroughScreen() {
    return (
        <View style={styles.stepContainer}>

            <SelectableList
                options={[
                    { label: 'Manhattan', value: 'Manhattan' },
                    { label: 'Brooklyn', value: 'Brooklyn' },
                    { label: 'Queens', value: 'Queens' },
                    { label: 'Bronx', value: 'Bronx' },
                    { label: 'Staten Island', value: 'Staten Island' },
                ]}
                selectedValue="brooklyn"
                onSelect={(val) => changeBorough(val)}
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
