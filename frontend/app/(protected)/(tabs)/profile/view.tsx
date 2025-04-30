import UserProfileView from '@/components/UserProfileView';
import { useSession } from '@/utils/authContext';
import React from 'react';

export default function ViewScreen() {
  const { session } = useSession()
  return <UserProfileView user={session.user} likable={false} />
}