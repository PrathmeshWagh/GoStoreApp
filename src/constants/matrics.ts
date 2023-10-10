import { s, ms, vs, mvs } from 'react-native-size-matters';

export const scale = {
	s,
	ms: (size: number, factor = 0.1) => ms(size, factor),
	vs,
	mvs: (size: number, factor = 0.1) => mvs(size, factor)
};
