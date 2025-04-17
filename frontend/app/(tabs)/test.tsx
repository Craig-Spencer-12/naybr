import { View, Text, StyleSheet, Button, ActivityIndicator, Image, Platform } from 'react-native';
import React, { useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TestScreen() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://192.168.1.209:8080/books'); // replace with your actual API URL
      const data = await res.text(); // or use res.json() if it returns JSON
      setResponse(data);
    } catch (err) {
      setResponse(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Test</ThemedText>
      </ThemedView>
      <ThemedText>Testing the ability to ping my api locally</ThemedText>

      <View style={styles.container}>
      <Button title="Call API" onPress={handleFetch} />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {response && <Text style={styles.text}>{response}</Text>}
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#808080',
  },
});
