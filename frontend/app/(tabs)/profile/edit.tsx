import { EditProfile } from '@/types/Profile';
import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TouchableOpacity } from 'react-native'

import { Image, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import UploadImageButton from '@/components/UploadImage';
import EditableText from '@/components/EditableText';

import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

  const navigation = useNavigation(); // Hook to navigate

  // Function to navigate to the BoroughSelectionScreen
  const handleNavigateToBorough = () => {
    navigation.navigate('Borough');
  };

  const currentUser: EditProfile = {
    firstName: 'Craig',
    lastName: 'Spencer',
    profilePhotoURL: 'test3.png',
    dob: '02/16/2000',
    gender: 'M',
    borough: 'Brooklyn',
    bio: 'I\'m the best coder ever!',
    activities: [
      {
        title: 'Robot Maker',
        photoURL: '3.png',
      },
      {
        title: 'Surfer',
        photoURL: 'example.png',
      }
    ]
  };
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const bottom = useBottomTabOverflow();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ThemedView style={styles.container}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{ bottom }}
          contentContainerStyle={{ paddingBottom: bottom }}>
          <UploadImageButton defaultUri='test123.jpeg' />
          <ThemedView style={styles.content}>
            <ThemedText type="title">{currentUser.firstName} {currentUser.lastName}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.content}>

            <EditableText initialValue="user@example.com" onSave={(val) => console.log('Saved:', val)} />
            <EditableText initialValue="Male" onSave={(val) => console.log('Saved:', val)} />
            <EditableText initialValue="This is the bio" onSave={(val) => console.log('Saved:', val)} />

            <TouchableOpacity onPress={handleNavigateToBorough}>
              <Text style={{ color: 'blue', marginTop: 20 }}>Change Borough</Text>
            </TouchableOpacity>

          </ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
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
