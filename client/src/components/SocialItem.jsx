import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../utils/consts';
import { getImageById } from '../http/galleryAPI';
import { Link } from 'react-router-dom';

const SocialItem = observer(({ link, imageId, className }) => {

    const [fileName, setFileName] = useState('');

    useEffect(() => {
        getImageById(imageId, 'full')
            .then(data => {
                setFileName(data);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Link to={link} className={className} target='_blank' rel="noreferrer">
            {fileName &&
                <img src={fileName.file_path} alt={fileName.file_name} />
            }
        </Link>
    );
});

export default SocialItem;