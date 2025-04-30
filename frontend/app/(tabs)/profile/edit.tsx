import { EditProfile, Profile } from '@/types/Profile';
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
import { useSession } from '@/context/Provider';

export default function ProfileScreen() {

  const { session, setSession } = useSession();

  const navigation = useNavigation()

  const handleNavigate = (location: string) => {
    navigation.navigate(location as never);
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
            <UploadImageButton defaultUri={session.user.profilePhotoURL}/>
          </View>
          <ThemedView style={styles.content}>
            <ThemedText type="title">{session.user.firstName}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.content}>

            {/* <EditableText initialValue="user@example.com" onSave={(val) => console.log('Saved:', val)} />
            <EditableText initialValue="Male" onSave={(val) => console.log('Saved:', val)} />
            <EditableText initialValue="This is the bio" onSave={(val) => console.log('Saved:', val)} /> */}

            <TouchableOpacity onPress={() => handleNavigate('Borough')}>
              <Text style={styles.thisText}>Change Borough</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Gender')}>
              <Text style={styles.thisText}>Change Gender</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Bio')}>
              <Text style={styles.thisText}>Change Bio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('NewActivity')}>
              <Text style={styles.thisText}>Create New Activity</Text>
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
  },
  thisText: {
    color: 'white',
    marginTop: 20
  }
});


const emptyUser: Profile = {
  firstName: 'EmptyUser',
  profilePhotoURL: 'test3.png',
  age: 0,
  gender: 'F',
  borough: 'Queens',
  bio: 'The user should never see this',
  activities: [
    {
      title: 'Robot Making',
      photoURL: '3.png',
      id: '',
      userID: ''
    },
    {
      title: 'Surfing',
      photoURL: 'example.png',
      id: '',
      userID: ''
    }
  ]
};