import { View, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Urls } from '@/constants/Urls';
import { Activity, Like, Profile } from '@/types/Profile'
import ProfileInfoBar from '@/components/ProfileInfoBar'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ActivityCard from '@/components/ActivityCard';
import { IconSymbol } from './ui/IconSymbol';
import { useSession } from '@/utils/authContext';
import { fetchPostLike } from '@/api/fetchClient';

type Props = {
  user: Profile
  likable: boolean
  nextUserFunc?: () => void
};

export default function UserProfileView({ user, likable, nextUserFunc }: Props) {

  const { session } = useSession()

  const like = (activity: Activity) => {
    fetchPostLike(session.id, activity)
    nextUserFunc && nextUserFunc()
  }

  const notLike = () => {
    nextUserFunc && nextUserFunc()
  }

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <Image source={{ uri: Urls.minio + user!.profilePhotoURL }} style={{ width: '100%', height: '100%' }} />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{user!.firstName}</ThemedText>
        </ThemedView>
        <ProfileInfoBar age={user!.age} gender={user!.gender} borough={user!.borough} />
        <ThemedText>{user!.bio}</ThemedText>

        <View style={styles.container}>

          {user.activities && (user!.activities.map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <ActivityCard
                key={index}
                userId={activity.userID}
                id={activity.id}
                title={activity.title}
              />
              {likable && (
                <View style={styles.likeContainer}>
                  <TouchableOpacity onPress={() => { like(activity) }}>
                    <View style={styles.circle}>
                      <IconSymbol size={40} name="heart.fill" color={'#ffffff'} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          )))}
        </View>
      </ParallaxScrollView>

      {likable && (
        <View style={styles.notLikeContainer}>
          <TouchableOpacity onPress={notLike}>
            <View style={styles.notLikeCircle}>
              <IconSymbol size={40} name="xmark" color={'#ffffff'} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  },
  activityContainer: {

  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30, // half the width/height for a perfect circle
    backgroundColor: '#353636',
    justifyContent: 'center',  // centers icon vertically
    alignItems: 'center',      // centers icon horizontally

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  notLikeContainer: {
    position: 'absolute',
    top: '80%', // adjust as needed
    left: '5%', // adjust as needed
  },
  notLikeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30, // half the width/height for a perfect circle
    backgroundColor: '#A05051',
    justifyContent: 'center',  // centers icon vertically
    alignItems: 'center',      // centers icon horizontally
  }
});
