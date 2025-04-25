import { EditProfile } from '@/types/Profile';
import { StyleSheet, View, Text } from 'react-native'

import { Image, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import type { PropsWithChildren, ReactElement } from 'react';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import UploadImageButton from '@/components/UploadImage';

export default function ProfileScreen() {

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
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
          <UploadImageButton defaultUri='test123.jpeg'/>
        <ThemedView style={styles.content}>
          <ThemedText type="title">{currentUser.firstName} {currentUser.lastName}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.content}>
          <ThemedText type="subtitle">upload image</ThemedText>
          {/* <ThemedText>
      
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12'
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText> */}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
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
