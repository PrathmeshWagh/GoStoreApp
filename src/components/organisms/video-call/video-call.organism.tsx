/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useVideoCallMutation } from '@api/video-call/create-meeting.api';
import { useEnhancedNavigation, useRetailerHook } from '@hooks/index';
import { Spinner } from '@atoms/index';
import { AppDispatch } from '@slices/store';
import { showSnackbar } from '@slices/snackbar.slice';
import VideoCall from 'components/molecules/video-call/call.molecule';

export const CALLSTATUS = {
    CALLING: 0,
    RINGING: 1,
    CONNECTED: 2,
    COMPLETED: 3,
    DECLINED: 4,
    UNANSWERED: 5,
    DISCONNECTED: 6,
};

export const getCallStatusLabel = (callStatusId = -1) => {
    return (Object.keys(CALLSTATUS) as (keyof typeof CALLSTATUS)[]).find((key) => (CALLSTATUS[key] === callStatusId)) || '';
};

export default function VideoCallWrapper() {
    const dispatch = useDispatch<AppDispatch>();
    const { router, pop } = useEnhancedNavigation();
    const { mutate: createMeeting, isLoading, data, error } = useVideoCallMutation();
    const { subscribe, unsubscribe, firestoreUser, updateMeetingStatus } = useRetailerHook();
    const navigation = useNavigation();

    useEffect(() => {
        if (router.params?.sellerId) {
            const payload = {
                retailerId: router.params?.sellerId,
            };
            createMeeting(payload);
        }
    }, [router.params?.sellerId]);

    useEffect(() => {
        if (data?.data?.status === 'created' && router.params?.sellerId) {
            subscribe(router.params?.sellerId, data?.data?.data.meetingId);
        }  else if (data?.data?.status === 'busy') {
            dispatch(showSnackbar({ message: 'Seller is currently busy, please try again later.', label: 'Close' }));
            pop();
        } else if (error?.response?.data?.message === 'No Seller found!' || error) {
            dispatch(showSnackbar({ message: 'An error occurred, please try again later.', label: 'Close' }));
            pop();
        }
    }, [data, error]);

    const endMeet = () => {
        if (firestoreUser) {
            updateMeetingStatus('3');
        } else {
            pop();
        }
    };

    useEffect(() => {
        if (
            firestoreUser &&
            [CALLSTATUS.DISCONNECTED, CALLSTATUS.DECLINED, CALLSTATUS.UNANSWERED, CALLSTATUS.COMPLETED].includes(firestoreUser.callStatus)
        ) {
            if (unsubscribe) {
                unsubscribe();
            }
            dispatch(showSnackbar({ message: `Call ${getCallStatusLabel(firestoreUser.callStatus).toLowerCase()}`, label: 'Close' }));
            pop();
        }

        const popping = navigation.addListener('beforeRemove', () => {
            // Update the meeting status when the component is popped
            if (firestoreUser) {
                updateMeetingStatus('3');
            }
        });

        return () => {
            // Cleanup logic when the component is unmounted
            // Unsubscribe from the listener
            if (popping) {
                popping();
            }
        };
    }, [firestoreUser]);

    if (isLoading) {
        return (
            <Spinner text="Creating Meeting..." />
        );
    }

    if (firestoreUser?.appToken) {
        return <VideoCall token={firestoreUser.appToken}/>;
    }

    return <View/>;
}
