import React, { useContext, useState } from 'react';
import cl from './LastItem.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../../..';

const LastItem = observer(() => {

    const { tourStore } = useContext(ContextMain);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');

    return (
        <div className={cl.lastItemHolder}>
            <h4 className={cl.titleBlock}>Последний элемент</h4>
            <div className={cl.lastItemWrapper}>
                <div className={cl.nameitem}>{name}</div>
                
            </div>
        </div>
    );
});

export default LastItem;