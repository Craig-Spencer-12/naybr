import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/Profile'
import UserProfileView from '@/components/UserProfileView';
import { EmptyUser } from '@/constants/Empty';
import { useSession } from '@/utils/authContext';
import { useGetRandomUser } from '@/hooks/useGetRandomUser';

export default function NaybrsScreen() {
  const [profile, setProfile] = useState<Profile>(EmptyUser)
  const [userId, setUserId] = useState<string>('')
  const { session } = useSession()
  const { getRandomUser } = useGetRandomUser()

  useEffect(() => {
    getRandomUser(userId, setUserId, setProfile)
  }, [session.id])
  
  return <UserProfileView user={profile} likable={true} nextUserFunc={() => getRandomUser(userId, setUserId, setProfile)} />
}
