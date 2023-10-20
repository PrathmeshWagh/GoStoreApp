// import { usePaymentsContext } from '@/context/ui.payments.context';
import { useState } from 'react';

const useOffersSectionHook = () => {
	const [showOffersModal, setShowOffersModal] = useState(false);
	// const { activeOfferDetails, storeActiveOfferDetails } = usePaymentsContext();

	const openOffersModal = () => {
		setShowOffersModal(true);
	};

	const hideOffersModal = () => {
		setShowOffersModal(false);
	};

	const handleOfferSelection = (offerData) => {
		console.log('offerData', offerData);
		// storeActiveOfferDetails(offerData);
		hideOffersModal();
	};

	return {
		showOffersModal,
		openOffersModal,
		hideOffersModal,
		// activeOfferDetails,
		handleOfferSelection
	};
};

export default useOffersSectionHook;
