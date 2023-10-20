import { ViewStyle } from 'react-native';

export const centerBoth = (): ViewStyle => ({
    justifyContent: 'center',
    alignItems: 'center',
});

export const centerVertical = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
});

export const centerHorizontal = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'center',
});

export const container = (): ViewStyle => ({
    flex: 1,
});

export const flexCenterVertical = (): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
});

export const border1 = ({ width = 1, color = '#808B96', radius = 4 }): ViewStyle => ({
    borderWidth: width,
    borderColor: color,
    borderRadius: radius,
});

export const flexDirection = (direction: 'row' | 'column'): ViewStyle => ({
    flexDirection: direction,
});

export const itemsBetween = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const radiusFull = (): ViewStyle => ({
    borderRadius: 199,
});

export const textAlign = (align: 'center' | 'auto' | 'left' | 'right' | 'justify') => ({
    textAlign: align,
});

export const borderBottom = ({ width = 1, color = '#808B96' }): any => ({
    borderBottomWidth: width,
    borderBottomColor: color,
});

export const flexCenter = (): any => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
});
