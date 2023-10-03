import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import { GetLocationIcon, LocationIcon } from '@icons/index';
import { TouchableRipple } from 'react-native-paper';
import { useTheme } from '@hooks/index';
import { border1, centerBoth } from '@helpers/index';
import { DefaultStyles } from 'primitives';

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

const Location = () => {
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825, // Initial latitude
        longitude: -122.4324, // Initial longitude
        latitudeDelta: 0.0222, // Zoom level (adjust as needed)
        longitudeDelta: 0.0221, // Zoom level (adjust as needed)
	});
	const { colors } = useTheme();
	const mapRef = useRef<MapView | null>(null);
	const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

	useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    ...region,
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
    }, []);

	const handleRegionChange = async (newRegion: Region) => {
        setRegion(newRegion);
		const address = await getAdressFromCoordinates(newRegion.latitude, newRegion.longitude);
		console.log(address);
	};

	const handleChange = (newRegion: Region) => {
		setMarkerCoordinate({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
        });
	};

	const getAdressFromCoordinates = async (latitude: number, longitude: number) => {
		try {
			const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDf3OfiD1eSn4Wm3BVNNf6AhoNxl59aYUY`);
			if (response.data.status === 'OK') {
				const address = response.data.results[0];
				return address;
			} else {
				console.error('Error in Geocoding API:', response.data.status);
				return null;
			}
		} catch (error) {
			console.error('Error fetching address:', error);
			return null;
		}
	};

	const getCurrentLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setRegion({
					...region,
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
	};

	const zoomToLocation = (latitude: number, longitude: number) => {
        mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0222,
        }, 1000);
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
					style={[ styles.location, { backgroundColor: colors.tertiary } ]}
					onPress={getCurrentLocation}
				>
					<>
						<GetLocationIcon size={24}/>
						<Text></Text>
					</>
				</TouchableRipple>
			</MapView>
			<View style={styles.addressDetails}>
            {/* Display your address details here */}
				<Text>Address Line 1</Text>
				<Text>Address Line 2</Text>
				<Text>City, State, Zip</Text>
				{/* <Button title="Get Current Location" onPress={getCurrentLocation} /> */}
			</View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
    },
    map: {
        flex: 0.7,
    },
    addressDetails: {
        flex: 0.3,
        padding: 10,
        backgroundColor: '#f5f5f5',
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
  });

export default Location;
