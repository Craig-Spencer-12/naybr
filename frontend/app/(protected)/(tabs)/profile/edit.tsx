import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TouchableOpacity } from 'react-native'
import { Platform } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Animated, { useAnimatedRef } from 'react-native-reanimated'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'
import { useNavigation } from '@react-navigation/native'
import { useSession } from '@/utils/authContext'
import UpdateProfileImage from '@/components/UpdateProfileImage'
import { useCallback } from 'react'

export default function ProfileScreen() {
  const { session, logOut } = useSession()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const bottom = useBottomTabOverflow()

  const navigation = useNavigation()

  const handleNavigate = useCallback((location: string) => {
    navigation.navigate(location as never)
  }, [navigation])

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
            <UpdateProfileImage />
          </View>
          <ThemedView style={styles.content}>
            <ThemedText type='title'>{session.user.firstName}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.content}>

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

            <Button title='Logout' onPress={logOut}></Button>

          </ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  )
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
})