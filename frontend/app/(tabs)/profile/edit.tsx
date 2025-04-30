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
import { Urls } from '@/constants/Urls';
import { useEffect, useState } from 'react';

export default function ProfileScreen() {

  const [imageUri, setImageUri] = useState<string>("test3.png")
  const [profile, setProfile] = useState<Profile>(emptyUser)

  const navigation = useNavigation()

  const handleNavigate = (location: string) => {
    navigation.navigate(location as never);
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  var currentUser = {
    id: '3f07b805-d67c-4b8b-b214-bc72ca75ed78'
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(Urls.getProfile + currentUser.id)
      const data: Profile = await res.json()
      setProfile(data)
      setImageUri(data.profilePhotoURL)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  };



  // const currentUser: EditProfile = {
  //   firstName: 'Craig',
  //   lastName: 'Spencer',
  //   profilePhotoURL: '40AA09DF-6852-4FD1-9663-AB72FD5B6762.jpg',
  //   dob: '02/16/2000',
  //   gender: 'M',
  //   borough: 'Brooklyn',
  //   bio: 'I\'m the best coder ever!',
  //   activities: [
  //     {
  //       title: 'Robot Maker',
  //       photoURL: '3.png',
  //       id: '',
  //       userID: ''
  //     },
  //     {
  //       title: 'Surfer',
  //       photoURL: 'example.png',
  //       id: '',
  //       userID: ''
  //     }
  //   ]
  // }
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
            <UploadImageButton defaultUri={imageUri}/>
          </View>
          <ThemedView style={styles.content}>
            <ThemedText type="title">{profile.firstName}</ThemedText>
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