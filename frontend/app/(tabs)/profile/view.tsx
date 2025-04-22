import UserProfileView from '@/components/UserProfileView';
import { Profile } from '@/types/Profile'

export default function EditScreen() {
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
      },
      {
        title: 'Surfer',
        photoURL: 'example.png',
      }
    ]
  };

  return <UserProfileView user={currentUser} />;
}