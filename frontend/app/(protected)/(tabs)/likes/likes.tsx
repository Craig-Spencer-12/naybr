import { Image, StyleSheet, Platform, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Urls } from '@/constants/Urls';
import { useEffect, useState } from 'react';
import { get } from '@/api/fetchClient';
import { useSession } from '@/utils/authContext';
import { LikeList } from '@/types/Profile';
import { ThemedView } from '@/components/ThemedView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/types'; 

type ViewLikeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewLike'>;

export default function LikesScreen() {

  const { session } = useSession()
  const [likes, setLikes] = useState<LikeList>();

  const navigation = useNavigation<ViewLikeScreenNavigationProp>()

  const handleNavigate = (id: string) => {
    navigation.navigate("ViewLike", {
      userId: id
    });

    // router.push({
    //   pathname: '/likes/viewLike',
    //   params: { userId: id},
    // });
  };

  async function fetchData() {
    const data = await get(Urls.getLikes + session.id)

    const parsed: LikeList = {
      Likes: data.list.map((item: any) => ({
        userId: item.userId,
        name: item.firstName,
      })),
    };

    setLikes(parsed)
  }

  useEffect(() => {
    fetchData()
  }, []);



  return (
    <FlatList
      data={likes?.Likes}
      // keyExtractor={(item) => item.userId}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item.userId)}>
          <Image
            source={{ uri: `${Urls.minio}${item.userId}/profile-photo.jpg` }}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
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
});
