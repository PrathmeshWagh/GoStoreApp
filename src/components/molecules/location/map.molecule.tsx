import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TouchableRipple } from 'react-native-paper';

import { GetLocationIcon, LocationIcon } from '@icons/index';
import { border1, centerBoth } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';
import { useTheme } from '@hooks/index';

interface Region {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
}

interface MapProps {
	mapRef: React.RefObject<MapView>;
	region: Region;
	handleChange: (newRegion: Region) => void;
	handleRegionChange: (newRegion: Region) => void;
	markerCoordinate: {
		latitude: number;
		longitude: number;
	};
	getCurrentLocation: () => void;
}

const Map = ({
	mapRef,
	region,
	handleChange,
	handleRegionChange,
	markerCoordinate,
	getCurrentLocation
}: MapProps) => {
	const { colors } = useTheme();

	return (
		<MapView
			ref={mapRef}
			style={styles.map}
			region={region}
			onRegionChange={handleChange}
			onRegionChangeComplete={handleRegionChange}
		>
			<Marker coordinate={markerCoordinate} title="My Location" description="Current location">
				<LocationIcon size={32} />
			</Marker>
			<TouchableRipple
				style={[styles.location, { backgroundColor: colors.onSecondary }]}
				onPress={getCurrentLocation}
			>
				<View style={{ zIndex: 9 }}>
					<GetLocationIcon size={24} />
				</View>
			</TouchableRipple>
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	location: {
		...border1({ radius: 100 }),
		...centerBoth(),
		position: 'absolute',
		width: DefaultStyles.DefaultPadding + 22,
		height: DefaultStyles.DefaultPadding + 22,
		right: 10,
		bottom: 10,
		zIndex: 9
	}
});

export default Map;
