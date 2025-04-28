import UserProfileView from '@/components/UserProfileView';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import React, { useEffect, useState } from 'react';

const currentUser: Profile = {
  firstName: 'Craig',
  profilePhotoURL: 'test3.png',
  age: 25,
  gender: 'M',
  borough: 'Brooklyn',
  bio: 'I\'m the best coder ever!',
  activities: [
    {
      title: 'Robot Maker',
      photoURL: '3.png',
      id: '123',
      userID: 'testID'
    },
    {
      title: 'Surfer',
      photoURL: 'example.png',
      id: '456',
      userID: 'testID'
    }
  ]
};

export default function ViewScreen() {

  useEffect(() => {
    fetchProfile()
  }, [])

  const [profile, setProfile] = useState<Profile>(currentUser)

  const fetchProfile = async () => {
    try {
      const res = await fetch(Urls.getProfile + '3f07b805-d67c-4b8b-b214-bc72ca75ed78')
      const data: Profile = await res.json()
      setProfile(data)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  };

  return <UserProfileView user={profile} likable={false} />
}