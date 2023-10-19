/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { HMSSDK, HMSUpdateListenerActions, HMSConfig, HMSTrackType, HMSTrackUpdate, HMSPeerUpdate, HMSTrackSource } from '@100mslive/react-native-hms';
import { Text } from 'react-native-paper';

import { useDimensions, useEnhancedNavigation, useTheme } from '@hooks/index';
import { ButtonWrapper } from '@atoms/index';
import EndCallIcon from '@assets/icons/end-call.svg';
import MicrophoneSlashIcon from '@assets/icons/microphone-slash.svg';
import MicrophoneIcon from '@assets/icons/microphone.svg';
import VideoCallIcon from '@assets/icons/video.svg';
import VideoCallSlashIcon from '@assets/icons/video-slash.svg';
import { centerBoth, container, flexDirection } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';

interface VideoCallProps {
    token: string;
}

const VideoCall = ({ token }: VideoCallProps) => {
    const { navigate, pop } = useEnhancedNavigation();
    const { peerTrackNodes, loading, leaveRoom, hmsInstanceRef } = usePeerTrackNodes({ navigate, pop, token });
    const [audioMuted, setAudioMuted] = useState(false);
    const [videoMuted, setVideoMuted] = useState(false);
    const HmsView = hmsInstanceRef.current?.HmsView;
    const { colors } = useTheme();
    const { height } = useDimensions();

    const _keyExtractor = (item: any) => item.id;

    const _renderItem = ({ item }: any) => {
        const { peer, track } = item;
        if (peerTrackNodes.length === 1 && peer.isLocal) {
            return (
                <View style={[styles.peerTileFullscreen, { height }]}>
                    <HmsView
                        trackId={track.trackId}
                        mirror={peer.isLocal}
                        style={styles.peerVideoFullscreen}
                    />
                </View>
            );
        } else {
            // Arrange peers with equal spacing when there is more than one peer.
            return (
                <View style={styles.peerTile}>
                    {track && track.trackId && !track.isMute() ? (
                        <HmsView
                            trackId={track.trackId}
                            mirror={peer.isLocal}
                            style={styles.peerVideo}
                        />
                    ) : (
                        <View style={styles.peerAvatarContainer}>
                            <View style={styles.peerAvatar}>
                                <Text variant="labelMedium" style={styles.peerAvatarText}>
                                    {peer.name
                                        .split(' ')
                                        .map((ite: any) => ite[0])
                                        .join('')}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            );
        }
    };

    const handleRoomEnd = () => {
        leaveRoom();
        pop();
    };

    const toggleVideo = async () => {
        const localPeer = await hmsInstanceRef.current.getLocalPeer();
        localPeer.localVideoTrack().setMute(!videoMuted);
        setVideoMuted(!videoMuted);
    };

    const toggleAudio = async () => {
        const localPeer = await hmsInstanceRef.current.getLocalPeer();
        localPeer.localAudioTrack().setMute(!audioMuted);
        setAudioMuted(!audioMuted);
    };

    const renderButtons = () => {
        return (
            <View style={{ ...centerBoth(), ...flexDirection('row') }}>
                <ButtonWrapper
                    onPress={toggleVideo}
                    styles={[styles.buttons, { backgroundColor: colors.white }]}
                >
                    {
                        videoMuted ?
                            <VideoCallSlashIcon
                                width={32}
                                height={32}
                            />
                            :
                            <VideoCallIcon
                                width={32}
                                height={32}
                            />
                    }
                </ButtonWrapper>
                <ButtonWrapper
                    onPress={handleRoomEnd}
                    styles={[styles.buttons, { backgroundColor: colors.error, marginHorizontal: DefaultStyles.DefaultPadding * 2.6 }]}
                >
                    <EndCallIcon
                        width={32}
                        height={32}
                    />
                </ButtonWrapper>
                <ButtonWrapper
                    onPress={toggleAudio}
                    styles={[styles.buttons, { backgroundColor: colors.white }]}
                >
                    {
                        audioMuted ?
                            <MicrophoneSlashIcon
                                width={32}
                                height={32}
                            />
                            :
                            <MicrophoneIcon
                                width={32}
                                height={32}
                            />
                    }
                </ButtonWrapper>
            </View>
        );
    };

    return (
        <View style={styles.container}>
        {loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color="#2471ED" />
            </View>
        ) : (
            <View style={{ ...container() }}>
                {peerTrackNodes.length > 0 && (
                    <FlatList
                        centerContent={true}
                        data={peerTrackNodes}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={_keyExtractor}
                        renderItem={_renderItem}
                        contentContainerStyle={styles.contentContainerStyle}
                    />
                )}
                <View style={styles.bottomButtonContainer}>
                    {renderButtons()}
                </View>
            </View>
        )}
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 26, // Position at the bottom
        left: 0, // Align to the left
        right: 0, // Align to the right
        flexDirection: 'row',
        ...centerBoth(),
        padding: 16, // You can adjust the padding as needed
        backgroundColor: 'transparent', // Optional, set the background color
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    peerTile: {
        flex: 1,
        margin: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    peerTileFullscreen: {
        backgroundColor: '#000',
    },
    peerVideo: {
        width: '100%',
        height: '100%',
    },
    peerAvatarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    peerAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FD8A8A',
    },
    peerAvatarText: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    welcomeText: {
        fontSize: 28,
        marginBottom: 32,
    },
    centerText: {
        fontSize: 16,
    },
    leaveRoomButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#CC525F',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leaveRoomButtonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    contentContainerStyle: {
        paddingBottom: 120,
        flexGrow: Platform.OS === 'android' ? 1 : undefined,
        justifyContent: Platform.OS === 'android' ? 'center' : undefined,
    },
    buttons: {
        width: DefaultStyles.DefaultHeight,
        height: DefaultStyles.DefaultHeight,
        backgroundColor: 'white',
        borderRadius: DefaultStyles.DefaultRadius * 10,
        ...centerBoth(),
    },
    peerVideoFullscreen: {
        flex: 1,  // This makes the video take up the entire available space
        backgroundColor: 'black', // Optional, set the background color
    },
});


//#endregion Screens

/**
 * Sets up HMSSDK instance, Adds required Event Listeners
 * Checkout Quick Start guide to know things covered {@link https://www.100ms.live/docs/react-native/v2/guides/quickstart | Quick Start Guide}
 */
export const usePeerTrackNodes = ({ navigate, pop, token }: any) => {
    const hmsInstanceRef = useRef<any>(null);
    const [loading, setLoading] = useState(true);
    const [peerTrackNodes, setPeerTrackNodes] = useState([]); // Use this state to render Peer Tiles

    const handleRoomLeave = async () => {
        try {
            const hmsInstance = hmsInstanceRef.current;

            if (!hmsInstance) {
                return Promise.reject('HMSSDK instance is null');
            }
            // Removing all registered listeners
            hmsInstance.removeAllListeners();

            /**
             * Leave Room. For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/leave | Leave Room}
             */
            const leaveResult = await hmsInstance.leave();
            console.log('Leave Success: ', leaveResult);

            /**
             * Free/Release Resources. For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/release-resources | Release Resources}
             */
            const destroyResult = await hmsInstance.destroy();
            console.log('Destroy Success: ', destroyResult);

            // Removing HMSSDK instance
            hmsInstanceRef.current = null;
        } catch (error) {
            console.log('Leave or Destroy Error: ', error);
        }
    };

    /**
     * Handles Join Update received from {@link HMSUpdateListenerActions.ON_JOIN} event listener
     * Receiving This event means User (that is Local Peer) has successfully joined room
     * @param {Object} data - object which has room object
     * @param {Object} data.room - current {@link HMSRoom | room} object
     */
    const onJoinSuccess = (data: any) => {
        /**
         * Checkout {@link HMSLocalPeer | HMSLocalPeer} Class
         */
        const { localPeer } = data.room;

        // Creating or Updating Local Peer Tile

        // `updateNode` function updates "Track and Peer objects" in PeerTrackNodes and returns updated list.
        // if none exist then we are "creating a new PeerTrackNode with the received Track and Peer"
        setPeerTrackNodes((prevPeerTrackNodes) =>
            updateNode({
                nodes: prevPeerTrackNodes,
                peer: localPeer,
                track: localPeer.videoTrack,
                createNew: true,
            })
        );

        // Turning off loading state on successful Room Room join
        setLoading(false);
    };

    /**
     * Handles Peer Updates received from {@link HMSUpdateListenerActions.ON_PEER_UPDATE} event listener
     * @param {Object} data - This has updated peer and update type
     * @param {HMSPeer} data.peer - Updated Peer
     * @param {HMSPeerUpdate} data.type - Update Type
     */
    const onPeerListener = ({ peer, type }: any) => {
        // We will create Tile for the Joined Peer when we receive `HMSUpdateListenerActions.ON_TRACK_UPDATE` event.
        // Note: We are chosing to not create Tiles for Peers which does not have any tracks
        if (type === HMSPeerUpdate.PEER_JOINED) return;

        if (type === HMSPeerUpdate.PEER_LEFT) {
            // Remove all Tiles which has peer same as the peer which just left the room.
            // `removeNodeWithPeerId` function removes peerTrackNodes which has given peerID and returns updated list.
            setPeerTrackNodes((prevPeerTrackNodes) =>
                removeNodeWithPeerId(prevPeerTrackNodes, peer.peerID)
            );
            return;
        }

        if (peer.isLocal) {
            // Updating the LocalPeer Tile.
            // `updateNodeWithPeer` function updates Peer object in PeerTrackNodes and returns updated list.
            // if none exist then we are "creating a new PeerTrackNode for the updated Peer".
            setPeerTrackNodes((prevPeerTrackNodes) =>
                updateNodeWithPeer({ nodes: prevPeerTrackNodes, peer, createNew: true })
            );
            return;
        }

        if (
            type === HMSPeerUpdate.ROLE_CHANGED ||
            type === HMSPeerUpdate.METADATA_CHANGED ||
            type === HMSPeerUpdate.NAME_CHANGED ||
            type === HMSPeerUpdate.NETWORK_QUALITY_UPDATED
        ) {
            // Ignoring these update types because we want to keep this implementation simple.
            return;
        }
    };

    /**
     * Handles Track Updates received from {@link HMSUpdateListenerActions.ON_TRACK_UPDATE} event listener
     * @param {Object} data - This has updated track with peer and update type
     * @param {HMSPeer} data.peer - Peer
     * @param {HMSTrack} data.track - Peer Track
     * @param {HMSTrackUpdate} data.type - Update Type
     */
    const onTrackListener = ({ peer, track, type }: any) => {
        // on TRACK_ADDED update
        // We will update Tile with the track or
        // create new Tile for with the track and peer
        if (type === HMSTrackUpdate.TRACK_ADDED && track.type === HMSTrackType.VIDEO) {
            // We will only update or create Tile "with updated track" when track type is Video.
            // Tiles without Video Track are already respresenting Peers with or without Audio.

            // Updating the Tiles with Track and Peer.
            // `updateNode` function updates "Track and Peer objects" in PeerTrackNodes and returns updated list.
            // if none exist then we are "creating a new PeerTrackNode with the received Track and Peer".
            setPeerTrackNodes((prevPeerTrackNodes) =>
                updateNode({
                    nodes: prevPeerTrackNodes,
                    peer,
                    track,
                    createNew: true
                })
            );

            return;
        }

        // on TRACK_MUTED or TRACK_UNMUTED updates, We will update Tiles (PeerTrackNodes)
        if (type === HMSTrackUpdate.TRACK_MUTED || type === HMSTrackUpdate.TRACK_UNMUTED) {
            // We will only update Tile "with updated track" when track type is Video.
            if (track.type === HMSTrackType.VIDEO) {
                // Updating the Tiles with Track and Peer.
                // `updateNode` function updates "Track and Peer objects" in PeerTrackNodes and returns updated list.
                // Note: We are not creating new PeerTrackNode object.
                setPeerTrackNodes((prevPeerTrackNodes) =>
                    updateNode({
                        nodes: prevPeerTrackNodes,
                        peer,
                        track
                    })
                );
            } else {
                // Updating the Tiles with Peer.
                // `updateNodeWithPeer` function updates Peer object in PeerTrackNodes and returns updated list.
                // Note: We are not creating new PeerTrackNode object.
                setPeerTrackNodes((prevPeerTrackNodes) =>
                    updateNodeWithPeer({
                        nodes: prevPeerTrackNodes,
                        peer
                    })
                );
            }
            return;
        }

        if (type === HMSTrackUpdate.TRACK_REMOVED) {
            // If non-regular track, or
            // both regular video and audio tracks are removed
            // Then we will remove Tiles (PeerTrackNodes) with removed track and received peer
            return;
        }

        /**
         * For more info about Degrade/Restore. check out {@link https://www.100ms.live/docs/react-native/v2/features/auto-video-degrade | Auto Video Degrade}
         */
        if (type === HMSTrackUpdate.TRACK_RESTORED || type === HMSTrackUpdate.TRACK_DEGRADED) {
            return;
        }
    };

    /**
     * Handles Errors received from {@link HMSUpdateListenerActions.ON_ERROR} event listener
     * @param {HMSException} error
     *
     * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/error-handling | Error Handling}
     */
    const onErrorListener = (error: any) => {
        setLoading(false);

        console.log(`${error?.code} ${error?.description}`);
    };

    // Effect to handle HMSSDK initialization and Listeners Setup
    useEffect(() => {
        const joinRoom = async () => {
          try {
            setLoading(true);

            /**
             * creating {@link HMSSDK} instance to join room
             * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/join#join-a-room | Join a Room}
             */
            const hmsInstance = await HMSSDK.build();

            // Saving `hmsInstance` in ref
            hmsInstanceRef.current = hmsInstance;


            /**
             * Adding HMSSDK Event Listeners before calling Join method on HMSSDK instance
             * For more info, Check out -
             * {@link https://www.100ms.live/docs/react-native/v2/features/join#update-listener | Adding Event Listeners before Join},
             * {@link https://www.100ms.live/docs/react-native/v2/features/event-listeners | Event Listeners},
             * {@link https://www.100ms.live/docs/react-native/v2/features/event-listeners-enums | Event Listeners Enums}
             */
            hmsInstance.addEventListener(HMSUpdateListenerActions.ON_JOIN, onJoinSuccess);

            hmsInstance.addEventListener(HMSUpdateListenerActions.ON_PEER_UPDATE, onPeerListener);

            hmsInstance.addEventListener(HMSUpdateListenerActions.ON_TRACK_UPDATE, onTrackListener);

            hmsInstance.addEventListener(HMSUpdateListenerActions.ON_ERROR, onErrorListener);

            /**
             * Joining Room. For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/join#join-a-room | Join a Room}
             */
            hmsInstance.join(new HMSConfig({ authToken: token, username: "gostor" }));
          } catch (error) {
            pop();
            console.error(error);
            // Alert.alert('Error', 'Check your console to see error logs!');
          }
        };

        joinRoom();

        // When effect unmounts for any reason, We are calling leave function
        return () => {
            handleRoomLeave();
        };
    }, [navigate]);

    return { loading, leaveRoom: handleRoomLeave, peerTrackNodes, hmsInstanceRef };
};

//#region Utilities

/**
 * returns `uniqueId` for a given `peer` and `track` combination
 */
export const getPeerTrackNodeId = (peer: any, track: any) => {
    return peer.peerID + (track?.source ?? HMSTrackSource.REGULAR);
};

/**
 * creates `PeerTrackNode` object for given `peer` and `track` combination
 */
export const createPeerTrackNode = (peer: any, track: any) => {
    let isVideoTrack = false;
    if (track && track?.type === HMSTrackType.VIDEO) {
        isVideoTrack = true;
    }
    const videoTrack = isVideoTrack ? track : undefined;
    return {
        id: getPeerTrackNodeId(peer, track),
        peer: peer,
        track: videoTrack
    };
};

/**
 * Removes all nodes which has `peer` with `id` same as the given `peerID`.
 */
export const removeNodeWithPeerId = (nodes: any, peerID: any) => {
    return nodes.filter((node: any) => node.peer.peerID !== peerID);
};

/**
 * Updates `peer` of `PeerTrackNode` objects which has `peer` with `peerID` same as the given `peerID`.
 *
 * If `createNew` is passed as `true` and no `PeerTrackNode` exists with `id` same as `uniqueId` generated from given `peer` and `track`
 * then new `PeerTrackNode` object will be created.
 */
export const updateNodeWithPeer = (data: any) => {
    const { nodes, peer, createNew = false } = data;

    const peerExists = nodes.some((node: any) => node.peer.peerID === peer.peerID);

    if (peerExists) {
        return nodes.map((node: any) => {
            if (node.peer.peerID === peer.peerID) {
                return { ...node, peer };
            }
            return node;
        });
    }

    if (!createNew) return nodes;

    if (peer.isLocal) {
        return [createPeerTrackNode(peer, null), ...nodes];
    }

    return [...nodes, createPeerTrackNode(peer, null)];
};

/**
 * Removes all nodes which has `id` same as `uniqueId` generated from given `peer` and `track`.
 */
export const removeNode = (nodes: any, peer: any, track: any) => {
    const uniqueId = getPeerTrackNodeId(peer, track);

    return nodes.filter((node: any) => node.id !== uniqueId);
};

/**
 * Updates `track` and `peer` of `PeerTrackNode` objects which has `id` same as `uniqueId` generated from given `peer` and `track`.
 *
 * If `createNew` is passed as `true` and no `PeerTrackNode` exists with `id` same as `uniqueId` generated from given `peer` and `track`
 * then new `PeerTrackNode` object will be created
 */
export const updateNode = (data: any) => {
    const { nodes, peer, track, createNew = false } = data;

    const uniqueId = getPeerTrackNodeId(peer, track);

    const nodeExists = nodes.some((node: any) => node.id === uniqueId);

    if (nodeExists) {
        return nodes.map((node: any) => {
            if (node.id === uniqueId) {
                return { ...node, peer, track };
            }
            return node;
        });
    }

    if (!createNew) return nodes;

    if (peer.isLocal) {
        return [createPeerTrackNode(peer, track), ...nodes];
    }

    return [...nodes, createPeerTrackNode(peer, track)];
};

//#endregion Utility

export default VideoCall;
