import { Image, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Urls } from '@/constants/Urls'
import { useCallback, useEffect, useState } from 'react'
import { fetchConnections } from '@/api/fetchClient'
import { useSession } from '@/utils/authContext'
import { ConnectionList } from '@/types/Profile'

export default function LikesScreen() {

  const { session, setConnectionInViewID } = useSession()
  const [likes, setLikes] = useState<ConnectionList>()

  const navigation = useNavigation()
  const handleNavigate = useCallback((id: string) => {
    setConnectionInViewID(id)
    navigation.navigate("ViewLike" as never)
  }, [navigation])

  useEffect(() => {
    fetchConnections(session.id, 'like').then(setLikes)
  }, [session.id])

  return (
    <FlatList
      data={likes?.connections}
      keyExtractor={(item) => item.userId}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item.userId)}>
          <Image
            source={{ uri: `${Urls.minio}${item.userId}/${Urls.profilePhoto}` }}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
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
    padding: 16,
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: '#ccc'
  },
  name: {
    fontSize: 18,
  },
})
