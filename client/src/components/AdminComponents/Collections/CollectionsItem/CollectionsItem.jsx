import React from 'react';
import { SERVER_URL } from '../../../../utils/consts';
import cl from './CollectionsItem.module.scss';

const CollectionsItem = ({ image, fileName, id }) => {

    return (
        <div data-image={id} className={cl.imageItem}>
            <img src={`${SERVER_URL}/${image}`} alt={fileName} />
        </div>
    );
};

export default CollectionsItem;