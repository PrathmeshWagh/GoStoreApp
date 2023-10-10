import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultStyles, FontGilroy } from '@primitives/index';

export default function SpecsAndInstaltion() {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [warranty, setWarraty] = useState<boolean>(false);
	const [installation, setinstalltion] = useState<boolean>(false);

	const toggleDetails = () => {
		setExpanded(!expanded);
	};

	const toggleWarranty = () => {
		setWarraty(!warranty);
	};

	const toggleInstalltion = () => {
		setinstalltion(!installation);
	};

	return (
		<View style={styles.container}>
			<View style={styles.section}>
				<TouchableOpacity onPress={toggleDetails}>
					<View style={styles.header}>
						<Text style={styles.headerText}>Specifications</Text>
						<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={22} color="#000" />
					</View>
				</TouchableOpacity>

				{expanded && (
					<View style={styles.content}>
						<Text>Supported Apps: Netflix, Disney+Hotstar</Text>
						<Text>Operating System: WebOS</Text>
						<Text>Sound Output: 20 W</Text>
						<Text>Prime Video, Youtube</Text>
						<Text>Resolution: Ultra HD (4K) 3840 x 2160 Pixels</Text>
						<Text>Refresh Rate: 60 Hz</Text>
					</View>
				)}
			</View>

			<View style={styles.section}>
				<TouchableOpacity onPress={toggleWarranty}>
					<View style={styles.header}>
						<Text style={styles.headerText}>Warranty</Text>
						<Icon name={warranty ? 'chevron-up' : 'chevron-down'} size={22} color="#000" />
					</View>
				</TouchableOpacity>

				{warranty && (
					<View style={styles.content}>
						<Text style={styles.warrantySummary}>Warranty summary</Text>
						<Text style={styles.warrantyText}>2 years Warranty</Text>
					</View>
				)}
			</View>

			<TouchableOpacity onPress={toggleInstalltion}>
				<View style={styles.freeInstall}>
					<Text style={styles.headerText}>Free installation</Text>
					<Icon name={installation ? 'chevron-up' : 'chevron-down'} size={22} color="#000" />
				</View>
			</TouchableOpacity>

			{installation && (
				<View style={styles.content}>
					<Text style={styles.installationTitle}>
						Free installation is available for this product
					</Text>
					<Text style={styles.installationText}>
						The installation will be scheduled as soon as the product is delivered. Upon delivery,
						our service team will arrange a visit as per your convenience.
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10
	},
	section: {
		borderBottomWidth: 1,
		paddingBottom: 10,
		marginBottom: 15
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerText: {
		fontSize: 15,
		fontFamily: FontGilroy.Bold
	},
	content: {},
	warrantySummary: {
		fontFamily: FontGilroy.SemiBold,
		fontSize: 15,
		marginVertical: 5
	},
	warrantyText: {
		fontFamily: FontGilroy.Medium
	},
	freeInstall: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 10,
		marginBottom: 5
	},
	installationTitle: {
		fontFamily: FontGilroy.SemiBold,
		fontSize: 16
	},
	installationText: {
		fontFamily: FontGilroy.Medium
	}
});
