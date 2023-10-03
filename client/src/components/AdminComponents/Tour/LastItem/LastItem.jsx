import React, { useContext, useEffect, useState } from 'react';
import cl from './LastItem.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../../..';
import { getImageById } from '../../../../http/galleryAPI';
import { SERVER_URL } from '../../../../utils/consts';
import { FaPen } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LastItem = observer(() => {

    const { tourStore } = useContext(ContextMain);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [imageId, setImageId] = useState();
    const [image, setImage] = useState('');

    useEffect(() => {
        setName(tourStore.lastItem.name);
        setLink(tourStore.lastItem.link);
        setImageId(tourStore.lastItem.imageId);
    }, []);

    useEffect(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(res => {
                setImage(res.fileName);
            })
    }, [imageId]);

    return (
        <div className={cl.lastItemHolder}>
            <h4 className={cl.titleBlock}>Последний элемент</h4>
            <div className={cl.lastItemWrapper}>
                <div className={cl.leftItem}>
                    <div className={cl.nameItem}>{name}</div>
                    <div className={cl.linkItem}>{link}</div>
                    {image &&
                        <div className={cl.imageItem}>
                            <img src={`${SERVER_URL}/${image}`} alt="" />
                        </div>
                    }
                </div>
                <div className={cl.rightItem}>
                    <FaPen

                    />
                    <AiFillEye />
                </div>
            </div>
        </div>
    );
});

export default LastItem;