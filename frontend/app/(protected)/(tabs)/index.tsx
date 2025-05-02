import React, { useState, useEffect } from 'react';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import UserProfileView from '@/components/UserProfileView';
import { EmptyUser } from '@/constants/Empty';
import { fetchProfile } from '@/api/fetchClient';
import { useSession } from '@/utils/authContext';

export default function NaybrsScreen() {
  const [profile, setProfile] = useState<Profile>(EmptyUser)
  const [userId, setUserId] = useState<string>('ebb97356-8167-4fd4-90e9-99bfb6d47489')
  const { session } = useSession()

  useEffect(() => {
    getRandomUser()
  }, [])

  const getRandomUser = async () => {
    try {
      let randId = userId
      while (randId === userId || randId === session.id) {
        const res = await fetch(Urls.randomUser)
        randId = JSON.parse(await res.text())
      }
      setUserId(randId)

      const user = await fetchProfile(randId)
      setProfile(user)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  // const fetchProfile = async () => {
  //   try {
  //     await getRandomUserId()
  //     const res = await fetch(Urls.getProfile + userId)
  //     const data: Profile = await res.json()
  //     setProfile(data)
  //   } catch (err) {
  //     console.log(`Error: ${err}`)
  //   }
  // };

  return <UserProfileView user={profile} likable={true} fetchFunction={getRandomUser}/>
}
