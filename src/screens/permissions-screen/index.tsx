import React from 'react';

import { Safearea } from '@atoms/index';
import Permissions from '@organisms/permissions/permissions.organism';

const PermissionsScreen = () => {

    return (
        <Safearea>
            <Permissions/>
        </Safearea>
    );
};

export default PermissionsScreen;
