import Layout from '@molecules/layout/layout.molecule';
import CardDetails from 'components/organisms/payment/card-details';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const CardDetailsScreen = () => {
	return (
		<Layout layout={layout}>
			<CardDetails />
		</Layout>
	);
};

export default CardDetailsScreen;
