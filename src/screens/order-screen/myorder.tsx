import Layout from 'components/molecules/layout/layout.molecule';
import MyOrder from 'components/organisms/orders/myorder';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};
const MyOrderScreen = () => {
	return (
		<Layout layout={layout}>
			<MyOrder />
		</Layout>
	);
};

export default MyOrderScreen;
