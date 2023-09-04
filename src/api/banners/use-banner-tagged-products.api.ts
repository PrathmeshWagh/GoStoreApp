import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import axios from 'axios';
import Config from 'react-native-config';

export const fetchTaggedBannerProducts = (inputs: {
    bannerId: number;
    state: string;
    clusterId: number;
}) => {
    return axios.get(
        `${Config.BASE_PATH}${ApiEndpoints.BannerDetails}`,
        {
            params: {
                bId: inputs.bannerId,
                state: inputs.state,
                tagType: 'PRODUCT',
                page: 1,
                pageSize: 500,
                clusterId: inputs.clusterId,
            },
        },
    );
  };
