export const objectToQueryString = (obj: Record<string, string | number | boolean>) => {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
};

export const getDiscount = (price: number, mrp: number) => {
    if (price && mrp) {
        const discount = Number((1 - price / mrp).toFixed(3)) * 100;
        if (discount > 0 && discount < 1) {
            return 1;
        }
        return Math.floor(discount);
    }
    return '';
};
