import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultStyles, FontGilroy } from '@primitives/index';

export default function SpecsAndInstaltion() {
	const [expanded, setExpanded] = useState(false);
	const [warraty, setWarraty] = useState(false);
	const [installation, setinstalltion] = useState(false);

	const toggleDetails = () => {
		setExpanded(!expanded);
	};

	const toggleWarranty = () => {
		setWarraty(!warraty);
	};

	const toggleInstalltion = () => {
		setinstalltion(!installation);
	};

	return (
		<View>
			<View style={{ borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>
				<TouchableOpacity onPress={toggleDetails}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ fontSize: 18, fontFamily: FontGilroy.Bold }}>Specifications</Text>
						<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
					</View>
				</TouchableOpacity>

				{expanded && (
					<View>
						<Text>Supported Apps: Netflix, Disney+Hotstar</Text>
						<Text>Operating System: WebOS</Text>
						<Text>Sound Output: 20 W</Text>
						<Text>Prime Video, Youtube</Text>
						<Text>Resolution: Ultra HD (4K) 3840 x 2160 Pixels</Text>
						<Text>Refresh Rate: 60 Hz</Text>
					</View>
				)}
			</View>

			<View style={{ borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>
				<TouchableOpacity onPress={toggleWarranty}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ fontSize: 18, fontFamily: FontGilroy.Bold }}>Warranty</Text>
						<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
					</View>
				</TouchableOpacity>

				{warraty && (
					<View>
						<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 16 }}>Warranty summary</Text>
						<Text style={{ fontFamily: FontGilroy.Medium }}> 2 years Warranty</Text>
					</View>
				)}
			</View>

			<TouchableOpacity onPress={toggleInstalltion}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ fontSize: 18, fontFamily: FontGilroy.Bold }}>Free installtion</Text>
					<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
				</View>
			</TouchableOpacity>

			{installation && (
				<View>
					<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 16 }}>
						Free installation is available for this product
					</Text>
					<Text style={{ fontFamily: FontGilroy.Medium }}>
						The installation will be scheduled as soon as the product is delivered. Upon delivery
						our service team will arrange a visit as per your convenience
					</Text>
				</View>
			)}
		</View>
	);
}
