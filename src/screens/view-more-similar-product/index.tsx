import ViewMoreSimilarProduct from 'components/organisms/view-more-similar-product/view-more-similar-product.organism';
import Layout from 'components/molecules/layout/layout.molecule';

const layout = {
	menu: false,
	search: false,
	back: true,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: false,
	pincode: false
};

const ViewMoreSimilarProductScreen = () => {
	return (
		<Layout layout={layout}>
			<ViewMoreSimilarProduct />
		</Layout>
	);
};

export default ViewMoreSimilarProductScreen;
