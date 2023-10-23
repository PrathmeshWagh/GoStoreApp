import Layout from '@molecules/layout/layout.molecule';
import Payment from 'components/organisms/payment/payment.organism';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const PaymentScreen = () => {
	return (
		<Layout layout={layout}>
			<Payment />
		</Layout>
	);
};

export default PaymentScreen;
