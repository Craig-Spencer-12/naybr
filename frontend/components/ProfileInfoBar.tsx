import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GenderMap } from '@/constants/GenderMap';

type Props = {
  age: number;
  gender: string;
  borough: string;
};

export default function ProfileInfoBar({ age, gender, borough }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Feather name="calendar" size={14} color="#8e8e93" />
        <Text style={styles.text}>{age}</Text>
      </View>
      <View style={styles.item}>
        <Feather name="user" size={14} color="#8e8e93" />
        <Text style={styles.text}>{GenderMap[gender]}</Text>
      </View>
      <View style={styles.item}>
        <Feather name="map-pin" size={14} color="#8e8e93" />
        <Text style={styles.text}>{borough}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '400',
  },
});
