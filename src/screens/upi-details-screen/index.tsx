import Layout from 'components/molecules/layout/layout.molecule';
import UPIDetails from 'components/organisms/payment/upi-details';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const UPIDetailsScreen = () => {
	return (
		<Layout layout={layout}>
			<UPIDetails />
		</Layout>
	);
};

export default UPIDetailsScreen;
