import React, { useState } from 'react';
import { Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Option = {
  label: string;
  value: string;
};

type SelectableListProps = {
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue?: string;
};

const SelectableList: React.FC<SelectableListProps> = ({ options, onSelect, selectedValue }) => {
  const [selected, setSelected] = useState<string | undefined>(selectedValue);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <FlatList
      data={options}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.item, selected === item.value && styles.selectedItem]}
          onPress={() => handleSelect(item.value)}
        >
          <Text style={[styles.label, selected === item.value && styles.selectedLabel]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#4caf50',
  },
  label: {
    fontSize: 16,
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SelectableList;
