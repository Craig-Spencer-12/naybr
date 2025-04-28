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

  const navigation = useNavigation()

  const handleNavigate = (location: string) => {
    navigation.navigate(location);
  }

  const currentUser: EditProfile = {
    firstName: 'Craig',
    lastName: 'Spencer',
    profilePhotoURL: '40AA09DF-6852-4FD1-9663-AB72FD5B6762.jpg',
    dob: '02/16/2000',
    gender: 'M',
    borough: 'Brooklyn',
    bio: 'I\'m the best coder ever!',
    activities: [
      {
        title: 'Robot Maker',
        photoURL: '3.png',
        id: '',
        userID: ''
      },
      {
        title: 'Surfer',
        photoURL: 'example.png',
        id: '',
        userID: ''
      }
    ]
  }
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
          <View style={styles.profileImageContainer}>
            <UploadImageButton defaultUri={currentUser.profilePhotoURL} />
          </View>
          <ThemedView style={styles.content}>
            <ThemedText type="title">{currentUser.firstName} {currentUser.lastName}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.content}>

            <EditableText initialValue="user@example.com" onSave={(val) => console.log('Saved:', val)} />
            <EditableText initialValue="Male" onSave={(val) => console.log('Saved:', val)} />
            <EditableText initialValue="This is the bio" onSave={(val) => console.log('Saved:', val)} />

            <TouchableOpacity onPress={() => handleNavigate('Borough')}>
              <Text style={{ color: 'white', marginTop: 20 }}>Change Borough</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Gender')}>
              <Text style={{ color: 'white', marginTop: 20 }}>Change Gendre</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Bio')}>
              <Text style={{ color: 'white', marginTop: 20 }}>Change Bio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('NewActivity')}>
              <Text style={{ color: 'white', marginTop: 20 }}>Create New Activity</Text>
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
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  profileImageContainer: {
    height: 200
  }
});


