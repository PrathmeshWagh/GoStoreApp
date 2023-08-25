/* eslint-disable @typescript-eslint/no-unused-vars */
interface ParentBannerData {
    parentBannerId: number;
    sequence: number;
    bannerName: string;
    colourCode: string;
    bannerType: string;
    tagType: string | null;
    title: string;
    timer: number;
    startTime: string;
    endTime: string;
}

interface ParentBannerApiResponse {
    status: string;
    data: BannerData[];
    ttl: number;
}

interface BannerImage {
    imgId: number;
    imgPath: string;
    imgPosition: 'BACKGROUND' | 'LEFT' | 'RIGHT' | 'CENTER';
}

interface BannerData {
    childBannerId: number;
    imgSequence: number;
    tagType: string;
    parentBannerId: number;
    clickable: number;
    timer: number;
    startTime: string;
    endTime: string;
    bannerName: string;
    bannerLink: string | null;
    imgs: BannerImage[];
}

interface BannerApiResponse {
    status: 'success' | 'error';
    data: BannerData[];
}
