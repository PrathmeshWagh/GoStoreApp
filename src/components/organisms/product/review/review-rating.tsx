import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks/index';
import CircularProgress from 'react-native-circular-progress-indicator';
import StarIcon from '@assets/icons/Star-New.svg';
import { DefaultStyles, FontGilroy } from '@primitives/index';

export default function ReviewsRatings() {
	const { colors } = useTheme();
	return (
		<>
			<Text style={{ fontFamily: FontGilroy.Bold, fontSize: 17 }}>Reviews & Ratings</Text>
			<View style={styles.container}>
				<View style={styles.ratingInfo}>
					<View style={styles.ratingValue}>
						<Text style={styles.ratingText}>4</Text>
						<StarIcon />
					</View>
					<Text style={styles.totalRatings}>
						<Text style={styles.boldText}>4</Text> Customer Ratings Across Ecommerce Platforms
					</Text>
				</View>
				<View style={styles.circularProgressContainer}>
					<View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
						<View style={styles.circularProgressItem}>
							<CircularProgress
								value={85}
								inActiveStrokeColor={colors.primary}
								inActiveStrokeOpacity={0.2}
								progressValueColor={'#000'}
								radius={25}
								activeStrokeWidth={3}
								inActiveStrokeWidth={3}
							/>
							<Text>Picture</Text>
						</View>

						<View style={styles.circularProgressItem}>
							<CircularProgress
								value={85}
								inActiveStrokeColor={colors.primary}
								inActiveStrokeOpacity={0.2}
								progressValueColor={'#000'}
								radius={25}
								activeStrokeWidth={3}
								inActiveStrokeWidth={3}
							/>
							<Text>connectivity</Text>
						</View>
					</View>
					<View style={{ margin: 10 }}>
						<CircularProgress
							value={85}
							inActiveStrokeColor={colors.primary}
							inActiveStrokeOpacity={0.2}
							progressValueColor={'#000'}
							radius={25}
							activeStrokeWidth={3}
							inActiveStrokeWidth={3}
						/>
						<Text>connectivity</Text>
					</View>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	ratingInfo: {
		flex: 1,
		paddingRight: 10,
		borderRightWidth: 1,
		borderRightColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center'
	},
	ratingValue: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	ratingText: {
		fontSize: 20,
		color: 'green'
	},
	starIcon: {
		width: 16,
		height: 16
	},
	totalRatings: {
		color: 'gray',
		fontSize: 16,
		textAlign: 'center'
	},
	boldText: {
		fontWeight: 'bold'
	},
	circularProgressContainer: {},
	circularProgressItem: {
		flexDirection: 'column',
		alignItems: 'center',
		margin: 10
	}
});
