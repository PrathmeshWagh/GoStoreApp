import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { useHome } from '@hooks/index';

const Home = () => {
	const { componentList, handleViewableItemsChanged, viewabilityConfig } = useHome();

	return (
		<>
			<FlatList
				data={componentList}
				renderItem={({ item }) => {
					const Component = item.component;
					return <Component {...item.props} />;
				}}
				keyExtractor={(item) => item.id}
				onViewableItemsChanged={handleViewableItemsChanged}
				viewabilityConfig={viewabilityConfig.current}
			/>
		</>
	);
};

export default Home;
