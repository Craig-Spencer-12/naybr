import { StyleSheet, View, Text } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>👤 This is the Edit Profile screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#ffffff'
  }
});


