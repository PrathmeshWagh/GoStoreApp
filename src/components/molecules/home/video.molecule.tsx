import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@hooks/index';

interface VideoPlayerProps {
	isPaused: boolean;
}

const VideoPlayer = (props: VideoPlayerProps) => {
	const { isPaused } = props;
	const [isBuffering, setIsBuffering] = useState<boolean>(false);
	const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Video
				source={{ uri: 'https://static.gostor.com/videos/homepage/gostor-intro.mp4' }}
				style={styles.backgroundVideo}
				resizeMode="cover"
				controls={false}
				paused={isPaused}
				repeat={true}
				muted={true}
				onBuffer={({ isBuffering: buffering }) => setIsBuffering(buffering)}
                onLoad={() => setIsBuffering(false)}
            />
			{isBuffering && (
                <ActivityIndicator
                    size="small"
                    color={colors.onError}
                    style={[styles.loader]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 400,
    },
    backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
    },
	loader: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -25 }, { translateY: -25 }],
	},
});

export default VideoPlayer;
