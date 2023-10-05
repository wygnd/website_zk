import React, { useContext, useState } from 'react';
import cl from './Collections.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Textarea from '../../Textarea/Textarea';
import { SERVER_URL } from '../../../utils/consts';
import CollectionsItem from './CollectionsItem/CollectionsItem';
import Fancybox from '../../Fancybox';

const Collections = observer(({ className }) => {

    const { collections } = useContext(ContextMain);
    const [desc, setDesc] = useState(collections.desc);
    const [images, setImages] = useState(collections.gallery);

    return (
        <div className={className}>
            <h2 className={cl.titleBlock}>Блок: {collections.name}</h2>
            <div className={cl.blockHolder}>
                {desc &&
                    <Textarea value={desc} onChange={e => setDesc(e.target.value)} full h200 />
                }
                {collections.gallery
                    ?
                    <div className={cl.galleryHolder}>
                        {collections.gallery.map(el =>
                            <CollectionsItem key={el.id} fileName={el.fileName} id={el.id} />
                        )}
                    </div>
                    :
                    <h2 className={cl.notFound}>Ничего не найднео</h2>
                }
            </div>
        </div>
    );
});

export default Collections;