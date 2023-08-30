import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
    return (
        <View style={styles.container}>
            <Video
            source={{ uri: 'https://static.gostor.com/videos/homepage/gostor-intro.mp4' }} // Can be a URL or a local file.
            style={styles.backgroundVideo} 
            resizeMode="cover"
            controls={true}
            
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 300,
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default VideoPlayer;
