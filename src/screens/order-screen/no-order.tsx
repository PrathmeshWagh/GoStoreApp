import Layout from 'components/molecules/layout/layout.molecule';
import NoOrder from 'components/organisms/orders/no-order';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};
const NoOrderScreen = () => {
	return (
		<Layout layout={layout}>
			<NoOrder />
		</Layout>
	);
};

export default NoOrderScreen;
