import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextMain } from '../../../..';
import { SERVER_URL } from '../../../../utils/consts';
import cl from './CollectionsItem.module.css';

const CollectionsItem = observer(({ fileName, id }) => {

    const { collections } = useContext(ContextMain);

    return (
        <div data-image={id} className={cl.imageItem}>
            <img src={`${SERVER_URL}/${fileName}`} alt={fileName} />
        </div>
    );
});

export default CollectionsItem;