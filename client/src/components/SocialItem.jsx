import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../utils/consts';
import { getImageById } from '../http/galleryAPI';
import { Link } from 'react-router-dom';

const SocialItem = observer(({ link, imageId, className }) => {

    const [fileName, setFileName] = useState('');

    useEffect(() => {
        getImageById(imageId)
            .then(data => {
                setFileName(data.size);
            })
    }, []);

    return (
        <Link to={link} className={className} target='_blank'>
            {fileName &&
                <img src={`${SERVER_URL}/${fileName.full}`} alt="" />
            }
        </Link>
    );
});

export default SocialItem;