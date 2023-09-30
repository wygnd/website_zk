import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../utils/consts';
import { getImageById } from '../http/galleryAPI';

const SocialItem = observer(({ link, imageId, className }) => {

    const [fileName, setFileName] = useState('');

    useEffect(() => {
        getImageById(imageId)
            .then(data => {
                setFileName(data.fileName);
            })
    }, []);

    return (
        <a href={link} className={className} target='_blank'>
            <img src={`${SERVER_URL}/${fileName}`} alt="" />
        </a>
    );
});

export default SocialItem;