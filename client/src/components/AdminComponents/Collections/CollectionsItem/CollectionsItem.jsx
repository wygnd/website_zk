import React from 'react';
import { SERVER_URL } from '../../../../utils/consts';
import cl from './CollectionsItem.module.css';

const CollectionsItem = ({ fileName, id }) => {
    return (
        <div data-image={id} className={cl.imageItem}>
            <img src={`${SERVER_URL}/${fileName}`} alt={fileName} />
        </div>
    );
};

export default CollectionsItem;