import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import Config from 'react-native-config';

export default function CategoriesScreen({ route }) {
	const { name } = route.params;

	const fetchData = async () => {
		try {
			const params = {
				category: 'TELEVISIONS',
				categoryId: '6360eb1464cb95ecdd4ad8c8',
				priceFilter: {},
				filterObj: {},
				clusterId: 1,
				state: 'Karnataka',
				sort: 'recommendation_asc',
				pageSize: 24,
				page: 1
			};
			const response = await axios.get(
				`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.GET_PRODUCTS}?queryStr=${encodeURIComponent(
					JSON.stringify(params)
				)}&isKiosk=false`
			);

			console.log('res', response);

			const data = response.data;
			console.log(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View>
			<Text>index</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
