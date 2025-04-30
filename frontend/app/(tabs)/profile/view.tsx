import UserProfileView from '@/components/UserProfileView';
import { useSession } from '@/context/Provider';
import React from 'react';

export default function ViewScreen() {

  const { session, setSession } = useSession();

  return <UserProfileView user={session.user} likerId={null} />
}