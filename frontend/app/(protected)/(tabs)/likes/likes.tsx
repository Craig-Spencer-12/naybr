// import { EditProfile, Profile } from '@/types/Profile';
// import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TouchableOpacity } from 'react-native'

// import { Image, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// import Animated, {
//   useAnimatedRef,
// } from 'react-native-reanimated';

// import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
// import UploadImageButton from '@/components/UploadImage';
// import EditableText from '@/components/EditableText';

// import { useNavigation } from '@react-navigation/native';
// import { useSession } from '@/utils/authContext';
// import UpdateProfileImage from '@/components/UpdateProfileImage';

// export default function LikesScreen() {

//   const { session, logOut } = useSession();

//    const navigation = useNavigation()
  
    // const handleNavigate = () => {
    //   navigation.navigate("ViewLike" as never);
    // }

//   const scrollRef = useAnimatedRef<Animated.ScrollView>();
//   const bottom = useBottomTabOverflow();

  // return (
  //   <ThemedView>
    
  //               {/* <EditableText initialValue="user@example.com" onSave={(val) => console.log('Saved:', val)} />
  //               <EditableText initialValue="Male" onSave={(val) => console.log('Saved:', val)} />
  //               <EditableText initialValue="This is the bio" onSave={(val) => console.log('Saved:', val)} /> */}
    
  //               <TouchableOpacity onPress={() => handleNavigate()}>
  //                 <Text>Change Borough</Text>
  //               </TouchableOpacity>

    
  //             </ThemedView>
  // );
// }

// const styles = StyleSheet.create({
//   text: {
//     color: '#ffffff'
//   },
//   titleContainer: {
//     color: '#ffffff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     color: '#ffffff',
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   container: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   content: {
//     flex: 1,
//     padding: 32,
//     gap: 16,
//     overflow: 'hidden',
//   },
//   profileImageContainer: {
//     height: 200
//   },
//   thisText: {
//     color: 'white',
//     marginTop: 20
//   }
// });


// const emptyUser: Profile = {
//   firstName: 'EmptyUser',
//   profilePhotoURL: 'test3.png',
//   age: 0,
//   gender: 'F',
//   borough: 'Queens',
//   bio: 'The user should never see this',
//   activities: [
//     {
//       title: 'Robot Making',
//       photoURL: '3.png',
//       id: '',
//       userID: ''
//     },
//     {
//       title: 'Surfing',
//       photoURL: 'example.png',
//       id: '',
//       userID: ''
//     }
//   ]
// };







import { Image, StyleSheet, Platform, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Urls } from '@/constants/Urls';
import { useEffect, useState } from 'react';
import { get } from '@/api/fetchClient';
import { useSession } from '@/utils/authContext';
import { LikeList } from '@/types/Profile';
import { ThemedView } from '@/components/ThemedView';
// import { RootStackParamList } from '@/types/types';
// import { router } from 'expo-router';

export default function LikesScreen() {

  const { session } = useSession()
  const [likes, setLikes] = useState<LikeList>();

  const navigation = useNavigation()

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
            source={{ uri: `${Urls.minio}${item.userId}_profile-photo.jpg` }}
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
