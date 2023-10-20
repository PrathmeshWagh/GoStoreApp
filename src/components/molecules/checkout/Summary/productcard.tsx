import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import BasicCard from '@atoms/basic-card.atom';
import { Rupee } from 'components/atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrashIcon from '@assets/icons/trash.svg';
import { useTheme, useDimensions, usePermissionHandlers } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import moment from 'moment';

export default function ProductCart({ item }) {
	const { colors } = useTheme();
	return (
		<View style={{ marginVertical: 10 }}>
			<BasicCard style={{ paddingVertical: 8 }}>
				<View style={styles.cardContent}>
					<View style={{ justifyContent: 'center' }}>
						<Image
							source={{
								uri: 'https://static.arzooo.com/images/products/d95a4/0f3ec/d95a40f3ece87335852d948bfc279ccc3b7c5663c394eb57e1bc1b1e1b77db0a_00.jpg'
							}}
							style={styles.image}
							resizeMode="contain"
						/>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.title} numberOfLines={2}>
							{item.title}
						</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
							<Rupee money={item.price} styles={styles.price} />
							<Rupee money={item.mrp} styles={styles.mrp} />
							<Text style={{ fontFamily: FontGilroy.Medium, color: colors.primary }}>35% Off</Text>
						</View>
						<View style={styles.itemNumberContainer}>
							<TouchableOpacity style={[styles.button, { backgroundColor: '#D9E1E7' }]}>
								<Icon name={'minus'} size={18} color={colors.onSecondary} />
							</TouchableOpacity>
							<View style={[styles.button, { marginHorizontal: 5, backgroundColor: '#6F89A2' }]}>
								<Text style={{ textAlign: 'center', color: colors.onSecondary }}>
									{item.cartQuantity}
								</Text>
							</View>
							<TouchableOpacity style={[styles.button, { backgroundColor: '#D9E1E7' }]}>
								<Icon name={'plus'} size={18} color={colors.onSecondary} />
							</TouchableOpacity>
						</View>
						<View style={styles.deliveryContainer}>
							<Text style={[styles.deliveryText, { color: colors.primary }]}>
								{`Estimated delivery by ${moment(item.deliveryDateRange.fromDate).format(
									'DD MMM'
								)} - ${moment(item.deliveryDateRange.toDate).format('DD MMM')}`}
							</Text>
							<TouchableOpacity style={styles.deleteIcon}>
								<TrashIcon width={30} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</BasicCard>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContent: {
		flexDirection: 'row'
	},
	image: {
		width: 100,
		height: 100
	},
	infoContainer: {
		marginLeft: 16,
		flex: 1
	},
	title: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium
	},
	price: {
		fontSize: 16,
		fontFamily: FontGilroy.Medium
	},
	mrp: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium,
		textDecorationLine: 'line-through',
		lineHeight: 20,
		marginLeft: 4,
		marginRight: 2,
		color: 'gray'
	},
	itemNumberContainer: {
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	deliveryContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 2,
		flex: 1
	},
	deliveryText: {
		flex: 2,
		fontSize: 12,
		fontFamily: FontGilroy.Medium
	},
	deleteIcon: {
		paddingHorizontal: 3
	},
	button: {
		width: 28,
		height: 28,
		borderRadius: 14,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
