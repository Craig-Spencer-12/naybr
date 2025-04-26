import { View, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Urls } from '@/constants/Urls';
import { Activity, Like, Profile } from '@/types/Profile'
import ProfileInfoBar from '@/components/ProfileInfoBar'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ActivityCard from '@/components/ActivityCard';
import { IconSymbol } from './ui/IconSymbol';


var currentUser = {
  id: '3f07b805-d67c-4b8b-b214-bc72ca75ed78'
}

async function sendLike(activity: Activity) {
  let like: Like = {
    likerId: currentUser.id,
    likedId: activity.userID,
    activityId: activity.id
  }

  Alert.alert("this", activity.userID)
  
  try {
    fetch('http://192.168.1.209:8080/like', {
      method: 'POST',
      body: JSON.stringify(like),
    })
    
  } catch (err) {
    console.log('Upload error:', err)
    return false
  }
}

type Props = {
  user: Profile
  likable: boolean;
};

export default function UserProfileView({ user, likable }: Props) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={{ uri: Urls.minio + user.profilePhotoURL }} style={{ width: '100%', height: '100%' }} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{user.firstName}</ThemedText>
      </ThemedView>
      <ProfileInfoBar age={user.age} gender={user.gender} borough={user.borough} />
      <ThemedText>{user.bio}</ThemedText>

      <View style={styles.container}>
        {user.activities.map((activity, index) => (
          <View key={index} style={styles.activityContainer}>
            <ActivityCard
              key={index}
              title={activity.title}
              photoURL={Urls.minio + activity.photoURL}
            />
            {likable && (
              <View style={styles.likeContainer}>
                <View style={styles.circle}></View>
                <TouchableOpacity onPress={() => sendLike(activity)}>
                  <IconSymbol size={40} name="heart.fill" color={'#ffffff'} />
                </TouchableOpacity>
              </View>
            )}

          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#808080',
  },
  likeContainer: {
    position: 'absolute',
    top: '75%', // adjust as needed
    left: '85%', // adjust as needed
    // width: 50,
    // height: 50,
    // borderRadius: 25,
    // backgroundColor: '#333333'
  },
  activityContainer: {

  },
  circle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333333',
    top: '-21%', // adjust as needed
    left: '-26%', // adjust as needed
  }
});
