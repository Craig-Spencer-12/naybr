import React, { useState, useEffect } from 'react';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import UserProfileView from '@/components/UserProfileView';
import { Alert, Text } from 'react-native';

export default function NaybrsScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile>(emptyUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(Urls.getProfile + 'ebb97356-8167-4fd4-90e9-99bfb6d47489')
      // Alert.alert('Test',await res.text())
      const data: Profile = await res.json()
      setProfile(data)
    } catch (err) {
      setErrorMessage(`Error: ${err}`)
    } finally {
      setLoading(false)
    }
  };

  return <UserProfileView user={profile} likable={true}/>
}


const emptyUser: Profile = {
  firstName: 'EmptyUser',
  profilePhotoURL: 'test3.png',
  age: 0,
  gender: 'F',
  borough: 'Queens',
  bio: 'The user should never see this',
  activities: [
    {
      title: 'Robot Making',
      photoURL: '3.png',
      id: '',
      userId: ''
    },
    {
      title: 'Surfing',
      photoURL: 'example.png',
      id: '',
      userId: ''
    }
  ]
};
