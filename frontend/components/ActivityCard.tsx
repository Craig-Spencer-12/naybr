import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Urls } from '@/constants/Urls'

type Props = {
  userId: string
  id: string
  title: string
}

export default function ActivityCard({ userId, id, title }: Props) {
  const photoURL = `${Urls.minio}${userId}/${id}.jpg`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: photoURL }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: '600',
    color: '#ECEDEE',
  },
})
