import React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
export const StreamVideo = ({stream}) => {
  return (
    <View style={styles.backgroundVideo}>
      <Video
        source={{
          uri: stream.playbackUrl,
        }}
        style={styles.backgroundVideo}
        rate={1}
        volume={1}
        muted={false}
        resizeMode="cover"
        repeat={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
});
