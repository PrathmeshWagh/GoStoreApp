// import { useEffect, useMemo, useState } from 'react';
// import { kioskUrls } from '@/helpers/constants/kiosk';
import Config from 'react-native-config';

// const useIsMounted = (): boolean => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(() => true);
//   }, []);

//   return isMounted;
// };

// const useKiosk = () => {
//   const isMounted = useIsMounted();
//   const [location, setLocation] = useState(isMounted ? window.location : undefined);

//   useEffect(() => {
//     if (!isMounted) return;

//     const setWindowLocation = () => {
//       setLocation(window.location);
//     };

//     if (!location) {
//       setWindowLocation();
//     }

//     window.addEventListener('popstate', setWindowLocation);

//     return () => {
//       window.removeEventListener('popstate', setWindowLocation);
//     };
//   }, [isMounted, location]);

//   const isKiosk = useMemo(() => {
//     return kioskUrls?.some((url) => location?.origin?.includes(url));
//   }, [location]);

//   return {
//     isKiosk,
//   };
// };

// export default useKiosk;

const useKiosk = () => {
	return {
		isKiosk: Config.NEXT_PUBLIC_IS_KIOSK === 'true'
	};
};

export default useKiosk;
