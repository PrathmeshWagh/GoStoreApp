export const objectToQueryString = (obj: Record<string, string | number | boolean>) => {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
};
