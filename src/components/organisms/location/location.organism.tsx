/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Text, TouchableRipple } from 'react-native-paper';

import { GetLocationIcon, LocationIcon } from '@icons/index';
import { useTheme } from '@hooks/index';
import { border1, centerBoth, itemsBetween } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';
import { CustomButtom, TextLoader } from '@atoms/index';
import { useCoordinates } from '@api/location/update-coordinates.api';

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

const Location = () => {
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.005, // Zoom level (adjust as needed)
        longitudeDelta: 0.005, // Zoom level (adjust as needed)
	});
	const { colors } = useTheme();
	const mapRef = useRef<MapView | null>(null);
	const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });
	const [address, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { isLoading: loading, refetch } = useCoordinates(region.latitude, region.longitude);

	useEffect(() => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    ...region,
                    latitude: latitude,
                    longitude: longitude,
                });
				zoomToLocation(latitude, longitude);
				setMarkerCoordinate({
					latitude: latitude,
					longitude: longitude,
				});
				const currentAddress = await getAdressFromCoordinates(latitude, longitude); // Fetch address immediately after getting initial location
				setAddress(currentAddress);
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

	const handleChange = useCallback((newRegion: Region) => {
        setMarkerCoordinate({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
        });
    }, []);

	const getAdressFromCoordinates = useCallback(async (latitude: number, longitude: number) => {
		setIsLoading(true);
		try {
			const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDf3OfiD1eSn4Wm3BVNNf6AhoNxl59aYUY`);
			if (response.data.status === 'OK') {
				const currentAddress = response.data?.results[0]?.formatted_address;
				setIsLoading(false);
				return currentAddress;
			} else {
				console.error('Error in Geocoding API:', response.data.status);
				setIsLoading(false);
				return null;
			}
		// eslint-disable-next-line no-catch-shadow
		} catch (error) {
			console.error('Error fetching address:', error);
			setIsLoading(false);
			return null;
		}
	}, []);

	const handleRegionChange = useCallback(async (newRegion: Region) => {
        setRegion(newRegion);
        const currentAddress = await getAdressFromCoordinates(newRegion.latitude, newRegion.longitude);
        setAddress(currentAddress);
    }, [getAdressFromCoordinates]);

	const zoomToLocation = useCallback((latitude: number, longitude: number) => {
        mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }, 1000);
    }, []);

	const getCurrentLocation = useCallback(() => {
		Geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setRegion({
					...region,
					latitude: latitude,
					longitude: longitude,
				});
				setMarkerCoordinate({
					latitude: latitude,
					longitude: longitude,
				});
				zoomToLocation(latitude, longitude);
			},
			(error) => {
				console.log(error);
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}, [setRegion, setMarkerCoordinate, zoomToLocation]);

	const handleLocation = async () => {
		refetch();
	};

    return (
        <View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				region={region}
				onRegionChange={handleChange}
				onRegionChangeComplete={handleRegionChange}
			>
				<Marker
					coordinate={markerCoordinate}
					title="My Location"
					description="Current location"
				>
					<LocationIcon size={32}/>
				</Marker>
				<TouchableRipple
					style={[ styles.location, { backgroundColor: colors.white } ]}
					onPress={getCurrentLocation}
				>
					<View style={{ zIndex: 9 }}>
						<GetLocationIcon size={24}/>
					</View>
				</TouchableRipple>
			</MapView>
			<View style={[styles.addressDetails, { backgroundColor: colors.white, shadowColor: colors.black }]}>
				<View style={[{ ...itemsBetween(), marginBottom: DefaultStyles.DefaultPadding + 10 }]}>
					<Text
						variant="titleMedium"
						style={[{ color: colors.textGrey1 }]}
					>
						{'select your location'.toUpperCase()}
					</Text>
					<TouchableRipple
						style={[{ ...border1({ radius: 4, color: colors.grey }) }, styles.changeBtn]}
					>
						<Text
							variant="titleSmall"
							style={{ color: colors.textGrey1 }}
						>
							{'change'.toUpperCase()}
						</Text>
					</TouchableRipple>
				</View>
				{
					isLoading ?
						<TextLoader times={2}/>
						:
						<>
							<Text
								variant="titleMedium"
								style={[{ marginBottom: DefaultStyles.DefaultPadding - 4, lineHeight: DefaultStyles.DefaultPadding + 4 }]}
							>
								{ address }
							</Text>
							<CustomButtom
								styles={{ marginTop: DefaultStyles.DefaultPadding }}
								text="confirm location"
								uppercase
								onPress={handleLocation}
								loading={loading}
								disabled={loading}
							/>
						</>
				}
			</View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
    },
    map: {
		flex: 1,
    },
    addressDetails: {
		paddingVertical: DefaultStyles.DefaultPadding,
		paddingHorizontal: DefaultStyles.DefaultPadding,
		borderTopLeftRadius: DefaultStyles.DefaultRadius,
		borderTopRightRadius: DefaultStyles.DefaultRadius,
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
		paddingBottom: DefaultStyles.DefaultPadding + 32,
		height: 250,
    },
	location: {
		...border1({ radius: 100 }),
		...centerBoth(),
		position: 'absolute',
		width: DefaultStyles.DefaultPadding + 22,
		height: DefaultStyles.DefaultPadding + 22,
		right: 10,
		bottom: 10,
		zIndex: 9,
	},
	changeBtn: {
		paddingHorizontal: DefaultStyles.DefaultPadding - 10,
		paddingVertical: DefaultStyles.DefaultPadding - 14,
	},
});

export default React.memo(Location);
