/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useGetStoresMutation } from 'api/store/get-stores';
import { AppDispatch, RootState } from '@slices/store';
import { useDispatch, useSelector } from 'react-redux';

const useStoresHook = () => {
	const { mutate: getStoreList, isLoading, data: storeResponse, error } = useGetStoresMutation();
	const [stores, setStores] = useState([]);
	const location = useSelector((state: RootState) => state.location);
	console.log('storehook', storeResponse);
	console.log('location', location);

	useEffect(() => {
		if (location) {
			getStoreList({
				state: location?.state,
				pincode: location?.pincode,
				clusterId: location?.cluster_id,
				// customerLocation: {
				//   lat: 12.8835,
				//   lon: 77.6436,
				// },
				storeVisibility: true,
				videoCall: 1,
				pageNo: 1,
				pageSize: 20
			});
		}
	}, [location]);

	useEffect(() => {
		if (storeResponse?.data?.status === 'success') {
			setStores(storeResponse?.data?.data || []);
		}
	}, [storeResponse]);

	return {
		stores,
		isLoading
	};
};

export default useStoresHook;
