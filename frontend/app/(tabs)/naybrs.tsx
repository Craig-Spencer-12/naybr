import React, { useState, useEffect } from 'react';
import { Urls } from '@/constants/Urls';
import { Profile } from '@/types/Profile'
import UserProfileView from '@/components/UserProfileView';

export default function NaybrsScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(Urls.getProfile + 'ebb97356-8167-4fd4-90e9-99bfb6d47489')
      const data: Profile = await res.json()
      setProfile(data)
    } catch (err) {
      setErrorMessage(`Error: ${err}`)
    } finally {
      setLoading(false)
    }
  };

  return <UserProfileView user={profile!} />
}
