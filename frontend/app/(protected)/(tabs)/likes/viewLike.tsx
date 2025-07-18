import UserProfileView from '@/components/UserProfileView'
import React, { useEffect, useState } from 'react'
import { fetchProfile } from '@/api/fetchClient'
import { Profile } from '@/types/Profile'
import { EmptyUser } from '@/constants/Empty'
import { useSession } from '@/utils/authContext'

export default function ViewLikeScreen() {
  const { connectionInViewID } = useSession()
  const [data, setData] = useState<Profile>(EmptyUser)

  useEffect(() => {
    fetchProfile(connectionInViewID).then(setData).catch(console.error);
  }, [connectionInViewID])

  return <UserProfileView user={data} likable={false} />
}
