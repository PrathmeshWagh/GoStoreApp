import { check, PERMISSIONS, RESULTS, requestMultiple, Permission } from 'react-native-permissions';

const useSellerHook = () => {
	const checkSellerAvailibilty = () => {
		const d = new Date();
		const hours = d.getHours();
		const minutes = d.getMinutes();
		let available = true;
		if ((hours === 19 && minutes > 30) || hours > 19 || hours < 11) {
			available = false;
		}
		return available;
	};

	const checkAndRequestPermissionsAndroid = async () => {
		const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
		const audioPermission = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
		const bluetoothPermission = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

		if (cameraPermission === RESULTS.GRANTED && audioPermission === RESULTS.GRANTED && bluetoothPermission === RESULTS.GRANTED) {
			return true;
		} else {
			const permissionsToRequest: Permission[] = [];
			if (cameraPermission !== RESULTS.GRANTED) {
				permissionsToRequest.push(PERMISSIONS.ANDROID.CAMERA);
			}
			if (audioPermission !== RESULTS.GRANTED) {
				permissionsToRequest.push(PERMISSIONS.ANDROID.RECORD_AUDIO);
			}
			if (bluetoothPermission !== RESULTS.GRANTED) {
				permissionsToRequest.push(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
			}

			const results = await requestMultiple(permissionsToRequest);
			if (Object.values(results).every((permissionResult) => permissionResult === RESULTS.GRANTED)) {
				return true;
			} else {
				return false;
			}
		}
	};

	const checkAndRequestPermissionsIOS = async () => {
		const cameraPermission = await check(PERMISSIONS.IOS.CAMERA);
		const audioPermission = await check(PERMISSIONS.IOS.MICROPHONE);
		const bluetoothPermission = await check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);

		if (cameraPermission === RESULTS.GRANTED && audioPermission === RESULTS.GRANTED && bluetoothPermission === RESULTS.GRANTED) {
			return true;
		} else {
			const results = await requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL]);
			if (Object.values(results).every((permissionResult) => permissionResult === RESULTS.GRANTED)) {
				return true;
			} else {
				return false;
			}
		}
	};

	return {
		checkSellerAvailibilty,
		checkAndRequestPermissionsAndroid,
		checkAndRequestPermissionsIOS,
	};
};

export default useSellerHook;
