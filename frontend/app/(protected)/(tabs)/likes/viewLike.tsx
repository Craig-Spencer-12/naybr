import UserProfileView from '@/components/UserProfileView';
import { useSession } from '@/utils/authContext';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { fetchProfile } from '@/api/fetchClient';
import { Profile } from '@/types/Profile';
import { EmptyUser } from '@/constants/Empty';

export default function ViewLikeScreen() {
  const route = useRoute()
  const { userId } = route.params

  const [data, setData] = useState<Profile>(EmptyUser);

  console.log(userId)

  useEffect(() => {
    const foo = async () => {
      const user = await fetchProfile(userId)
      setData(user)
    }

    foo()
  }, [])

  return <UserProfileView user={data} likable={false} />
}
