import { View, Text, StyleSheet, Button, ActivityIndicator, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import ProfileInfoBar from '@/components/ProfileInfoBar'

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ActivityCard from '@/components/ActivityCard';

export default function NaybrsScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(Urls.getProfile + 'ebb97356-8167-4fd4-90e9-99bfb6d47489')
      const data: Profile = await res.json()
      setProfile(data)
    } catch (err) {
      setErrorMessage(`Error: ${err}`)
    } finally {
      setLoading(false)
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={{ uri: "http://192.168.1.209:8080/image/zachProfile2.png" }} style={{ width: '100%', height: '100%' }}/>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{profile?.firstName}</ThemedText>
      </ThemedView>
      <ProfileInfoBar age={profile?.age!} gender={profile?.gender!} borough={profile?.borough!} />
      <ThemedText>Hey my name's Zach! I'm just a little guy here to make some friends!</ThemedText>

      <View>
      {profile?.activities.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.title}
          photoURL={Urls.minio + activity.photoURL}
        />
      ))}
    </View>

      {/* <View style={styles.container}>
        <Button title="Call API" onPress={fetchProfile} />
        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
        {errorMessage && <Text style={styles.text}>{errorMessage}</Text>}
      </View> */}

      
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
