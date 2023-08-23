// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CategoryApiResponse {
    status: string;
    data: Category[];
}

interface Category {
    id: string | number;
    displayName: string;
    slug: string;
    image: string;
    orderBy: number;
    subCateogry?: SubCategory[];
}

interface SubCategory {
    id: string | number;
    displayName: string;
    slug: string;
    image: string;
    orderBy: number;
}
