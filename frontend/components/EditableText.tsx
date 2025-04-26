import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface EditableTextProps {
    initialValue: string;
    onSave?: (value: string) => void;
}

export default function EditableText({ initialValue, onSave }: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        setIsEditing(false);
        onSave?.(value);
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        onSubmitEditing={handleSave}
                        returnKeyType='done'
                        autoFocus
                    />
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.text}>{value}</Text>
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Push icon to far right
        paddingHorizontal: 10,
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginRight: 10,
    },
    icon: {
        fontSize: 18,
    },
    buttonText: {
        fontSize: 18,
        color: '#00ADD8'
    },
});
