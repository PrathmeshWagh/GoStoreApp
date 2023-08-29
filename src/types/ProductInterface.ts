/* eslint-disable @typescript-eslint/no-unused-vars */
interface ProductType {
    id: number;
    productId: string;
    model: string;
    gostorAsn: string;
    title: string;
    description: string;
    mrp: number;
    priority: number;
    brand: string;
    parentCategory: string;
    category: string;
    primaryImgPath: string;
    storePrice: number;
    quantity: number;
    supplierId: number;
    discount: number;
    rating?: number;
    ratingCount?: number;
}

interface ProductResponseData {
    status: 'success' | 'error';
    data: ProductType[];
    totalProducts: number;
    isSpellCorrected: boolean;
}
