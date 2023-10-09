/* eslint-disable @typescript-eslint/no-unused-vars */
interface LocationResponse {
    status: string;
    msg: string;
    data: {
        pincode: number;
        city_id: number;
        city: string;
        state_id: number;
        state: string;
        district_id: number;
        district: string;
        cluster_id: number;
        cluster: string;
    };
}
