import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import ProfileInfoBar from '@/components/ProfileInfoBar'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ActivityCard from '@/components/ActivityCard';

export default function UserProfileView({ user }: { user: Profile }) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={{ uri: Urls.minio + user.profilePhotoURL }} style={{ width: '100%', height: '100%' }}/>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{user.firstName}</ThemedText>
      </ThemedView>
      <ProfileInfoBar age={user.age} gender={user.gender} borough={user.borough} />
      <ThemedText>{user.bio}</ThemedText>

      <View>
      {user.activities.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.title}
          photoURL={Urls.minio + activity.photoURL}
        />
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
});
