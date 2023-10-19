import React from 'react';
import { Text } from 'react-native-paper';

interface RupeeProps {
	money: number;
	styles?: any;
}

const Rupee = (props: RupeeProps) => {
	const { money, styles } = props;

	return (
		<Text style={styles}>
			{money?.toLocaleString('en-IN', {
				style: 'currency',
				currency: 'INR',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2
			})}
		</Text>
	);
};

export default Rupee;
