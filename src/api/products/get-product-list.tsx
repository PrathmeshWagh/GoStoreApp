import Config from 'react-native-config';
import axios from 'axios';
import useKiosk from 'components/atoms/Kiosk/useKiosk.hook';
import { useMutation } from 'react-query';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
// import { GetProduct } from '../utils/types';

interface GetProduct {
	params?: object;
	productData?: any;
	rootKey?: any;
}

const getProducts = async ({ params, productData, rootKey }: GetProduct) => {
	const { isKiosk } = useKiosk();
	// console.log('params', params);

	const response = await axios.get(
		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.GET_PRODUCTS}?queryStr=${encodeURIComponent(
			JSON.stringify(params)
		)}&${isKiosk}`
	);

	return response.data;
};

export const useGetProducts = () => {
	return useMutation((input: GetProduct) => getProducts(input), {
		// onSuccess: (response) => {
		// 	console.log('mutation ', response);
		// },
		onError: (error: { status: string; msg: string }) => {
			console.error('Categories Carousel Error', error);
		}
	});
};
