/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import { useCoordinates } from '@api/location/update-coordinates.api';
import Map from '@molecules/location/map.molecule';
import Address from '@molecules/location/address.molecule';
import { container } from '@helpers/index';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from '@routes/constants.routes';
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
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
	});
	const mapRef = useRef<MapView | null>(null);
	const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });
	const [address, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { isLoading: loading, refetch } = useCoordinates(region.latitude, region.longitude);
	const { navigate } = useEnhancedNavigation();

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

	const handleLocationManual = () => {
		navigate(RouteConstants.PincodeScreenRoute);
	};

    return (
		<View style={{ ...container() }}>
			<Map
				mapRef={mapRef}
				region={region}
				handleChange={handleChange}
				handleRegionChange={handleRegionChange}
				markerCoordinate={markerCoordinate}
				getCurrentLocation={getCurrentLocation}
			/>
			<Address
				handleLocation={handleLocation}
				loading={loading}
				address={address}
				isLoading={isLoading}
				handleLocationManual={handleLocationManual}
			/>
		</View>
    );
};

export default React.memo(Location);
