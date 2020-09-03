import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';

const Videos = [
  {
    Videourl: 'url1',
  },
  {
    Videourl: 'url2',
  },
  {
    Videourl: 'url3',
  },
  {
    Videourl: 'url3',
  },
  {
    Videourl: 'url3',
  },
  {
    Videourl: 'url3',
  },
  {
    Videourl: 'url3',
  },
  {
    Videourl: 'url3',
  },
  {
    Videourl: 'url3',
  },
];


export default function video() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Videos}
        renderItem={({ item }) =>
      <Video source={item.Videourl}
        ref={(ref) => {
          this.player = ref
        }}                                      // Store reference
        onBuffer={this.onBuffer}                // Callback when remote video is buffering
        onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
