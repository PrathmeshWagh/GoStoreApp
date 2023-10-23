/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const useRetailerHook = () => {
	const [firestoreUser, setFirestoreUser] = useState<any>(null);
	const [documentRef, setDocumentRef] = useState<any>(null);
	const secondaryApp = firebase.app('videocallfb');

	useEffect(() => {
		return () => {
			if (unsubscribeRef) {
				unsubscribeRef();
			}
		};
	}, []);

	let unsubscribeRef: any;

	const subscribe = async (retailerId: string | undefined, meetingId: string) => {
		try {
			const fireUser = await firestore(secondaryApp)
				.collection('gostor-users')
				.where('sellerId', '==', retailerId?.toString())
				.get();

			if (!fireUser?.docs || fireUser?.docs?.length === 0) {
				setFirestoreUser(null);
				return;
			}

			const userId = fireUser.docs[0].id;
			const docMainRef = firestore(secondaryApp)
				.collection('gostor-users')
				.doc(userId)
				.collection('zoomMeetings');

			const docData = await docMainRef.where('meetingId', '==', meetingId).get();

			if (docData.empty) {
				setFirestoreUser(null);
				return;
			}

			const documentId = docData.docs[0].id;
			const documentRef = docMainRef.doc(documentId);

			setDocumentRef(documentRef);

			unsubscribeRef = documentRef.onSnapshot((snap: any) => {
				setFirestoreUser({
					id: snap.id,
					...snap.data(),
				});
			});
		} catch (error) {
		console.error('Something went wrong!', error);
		}
	};

	const unsubscribe = () => {
		setFirestoreUser(null);
		if (unsubscribeRef) {
			unsubscribeRef();
		}
	};

	const updateMeetingStatus = async (status: string) => {
		try {
		if (documentRef) {
			await documentRef.update({
				callStatus: status,
			});
		}
		} catch (error) {
		console.error('Error while updating meeting status:', error);
		}
	};

	return {
		subscribe,
		firestoreUser,
		unsubscribe,
		updateMeetingStatus,
	};
};

export default useRetailerHook;
