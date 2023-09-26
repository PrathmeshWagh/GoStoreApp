import { useState } from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import useKiosk from 'components/atoms/Kiosk/useKiosk.hook';

import { ApiEndpoints } from 'api/utils/api-endpoints.api';

interface Props {
	params?: any;
	productData?: CustomTypes.ProductQueryParams;
	rootKey?: any;
}

export const getProducts = async ({ params, productData, rootKey }: Props) => {
	const { isKiosk } = useKiosk();
	// const queryString = new URLSearchParams(params).toString();

	// const url = `${rootKey === 'category' ? Config.BASE_PATH : Config.BASE_PATH_INVENTORY}${
	// 	ApiEndpoints.GET_PRODUCTS
	// }?queryStr=${encodeURIComponent(JSON.stringify(productData))}&${queryString}`;

	const response = await axios.get(
		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.GET_PRODUCTS}?queryStr=${encodeURIComponent(
			JSON.stringify(params)
		)}&${isKiosk}`
	);
	return response;
};

export const useGetProducts = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState<string | null>(null);

	const mutate = async ({ params = {}, productData, rootKey = 'category' }: Props) => {
		setIsLoading(true);

		try {
			const response = await getProducts({
				params,
				productData,
				rootKey
			});
			if (response?.data?.status === 'success' && response?.data?.data?.length > 0) {
				setResponse({
					data: response?.data?.data,
					pageNumber: productData?.page,
					pageSizeRequested: productData?.pageSize,
					pageSizeGenerated: response?.data?.data?.length
				});
			} else {
				setError('Something went wrong!');
			}
			setIsLoading(false);
		} catch (error) {
			console.log('Get Products Error', error);
			setError(error);
			setIsLoading(false);
		}
	};

	return {
		mutate,
		isLoading,
		response,
		error
	};
};
