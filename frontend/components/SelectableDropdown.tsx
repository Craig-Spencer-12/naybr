import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SimpleDropdown = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>('apple');

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Select a Fruit</Text>
    {/* TouchableOpacity to ensure it's clickable */}
    <TouchableOpacity style={styles.dropdownWrapper}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)} // Update selected value
        items={options} // List of options to pick from
        value={selectedValue} // Current selected value
        placeholder={{ label: 'Choose a fruit...', value: null }} // Placeholder text
      />
    </TouchableOpacity>
    <Text style={styles.selection}>
      {selectedValue ? `You selected: ${selectedValue}` : 'No selection made'}
    </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",

    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: "#fff",

    fontSize: 18,
    marginBottom: 16,
  },
  selection: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },


   
    dropdownWrapper: {
      width: '80%',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: 'white',
    },
});

export default SimpleDropdown;
