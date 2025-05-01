import React, { useState, useEffect } from 'react';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import UserProfileView from '@/components/UserProfileView';
import { EmptyUser } from '@/constants/Empty';

export default function NaybrsScreen() {
  const [profile, setProfile] = useState<Profile>(EmptyUser)
  const [userId, setUserId] = useState<string>('ebb97356-8167-4fd4-90e9-99bfb6d47489')

  useEffect(() => {
    fetchProfile()
  }, [])

  const getRandomUserId = async () => {
    try {
      let data = userId
      while (data === userId) {
        const res = await fetch(Urls.randomUser)
        data = JSON.parse(await res.text())
      }
      setUserId(data)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  const fetchProfile = async () => {
    try {
      await getRandomUserId()
      const res = await fetch(Urls.getProfile + userId)
      const data: Profile = await res.json()
      setProfile(data)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  };

  return <UserProfileView user={profile} likable={true} fetchFunction={fetchProfile}/>
}
