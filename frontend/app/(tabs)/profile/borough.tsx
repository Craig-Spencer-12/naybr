import SelectableList from "@/components/SelectableList";
import { StyleSheet, Text, View } from "react-native";

export default function BoroughScreen() {
    return (
        <View style={styles.stepContainer}>

            <SelectableList
                options={[
                    { label: 'Manhattan', value: 'manhattan' },
                    { label: 'Brooklyn', value: 'brooklyn' },
                    { label: 'Queens', value: 'queens' },
                    { label: 'Bronx', value: 'bronx' },
                    { label: 'Staten Island', value: 'statenIsland' },
                ]}
                selectedValue="brooklyn"
                onSelect={(val) => console.log('Selected:', val)}
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
