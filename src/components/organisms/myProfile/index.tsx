import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
// import { TextInput } from 'react-native-paper';

const MyProfile = () => {
	return (
		<View style={styles.profileContainer}>
			<View style={styles.innerContainer}>
				<View style={styles.profileCircle}>
					<Text style={{ textAlign: 'center', fontSize: 40, color: CustomColors.onSecondary }}>
						P
					</Text>
				</View>

				<View style={styles.nameBox}>
					<Text style={{ position: 'absolute', paddingLeft: 5, fontSize: 10 }}>Name</Text>
					<Text style={styles.inputText}>Prathmesh</Text>
				</View>
				<View style={styles.nameBox}>
					<Text style={{ position: 'absolute', paddingLeft: 5, fontSize: 10 }}>Email Id</Text>
					<Text style={styles.inputText}>prathmesh@gmail.com</Text>
				</View>
				<View style={styles.nameBox}>
					<Text style={styles.labelText}>Mobile Number</Text>
					<Text style={styles.inputText}>7875028667</Text>
				</View>
				{/* <TextInput style={styles.nameBox} disabled={true} /> */}
			</View>
		</View>
	);
};

export default MyProfile;

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1
	},
	innerContainer: {
		margin: 20,
		// height: DefaultStyles.DefaultHeight * 7,
		elevation: 2,
		borderRadius: 10,
		backgroundColor: CustomColors.onSecondary,
		alignItems: 'center',
		paddingBottom: DefaultStyles.DefaultPadding + 10
	},
	profileCircle: {
		marginTop: 20,
		justifyContent: 'center',
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: 'blue'
	},
	nameBox: {
		marginTop: 20,
		padding: DefaultStyles.DefaultPadding,
		width: '90%',
		height: DefaultStyles.DefaultHeight + 10,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: CustomColors.textGrey1
	},
	inputText: {
		color: CustomColors.cart,
		fontSize: 17,
		fontFamily: FontGilroy.SemiBold,
		paddingVertical: 5
	},
	labelText: {
		position: 'absolute',
		paddingLeft: 5,
		fontSize: 10
	}
});
