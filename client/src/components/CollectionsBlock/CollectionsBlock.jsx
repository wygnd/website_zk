import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import cl from './CollectionsBlock.module.css';
import { ContextMain } from '../..';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SERVER_URL } from '../../utils/consts';
import Fancybox from '../Fancybox';
import { AiOutlineEye } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';

const CollectionsBlock = observer(() => {

    const { collections } = useContext(ContextMain);
    const [swiperCollections, setSwiperCollections] = useState({});
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);

    return (
        <div id='collections__block' className={cl.collectionsBlock}>
            <div className="container">
                {collections.name &&
                    <h2 className={cl.blockTitle}>{collections.name}</h2>
                }
                <div className={cl.collectionsHolder}>
                    {collections.desc &&
                        <div className={cl.leftSide}>
                            <p>{collections.desc}</p>
                        </div>
                    }
                    <div className={cl.rightSide}>
                        {collections.gallery &&
                            <Swiper
                                modules={[Navigation]}
                                onSwiper={(swiper) => {
                                    setSwiperCollections(swiper);
                                }}
                                speed={800}
                                className={cl.swiperCollectionsBlock}
                                spaceBetween={30}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}

                            >
                                {collections.gallery.map(item =>
                                    <SwiperSlide key={item.id}>
                                        <Fancybox className={cl.imageItem}>
                                            <img
                                                src={`${SERVER_URL}/${item.fileName}`}
                                                alt={item.fileName}
                                                data-src={`${SERVER_URL}/${item.fileName}`}
                                                data-fancybox="galleryCollections"
                                            />
                                            <div className={cl.hoverImage}>
                                                <AiOutlineEye size={80} color='white' />
                                                Посмотреть
                                            </div>
                                        </Fancybox>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        }
                        {swiperCollections &&
                            <div className={cl.sliderTheme}>
                                <div
                                    ref={navigationPrevRef}
                                    className={[cl.slidePrev, 'arrow__prev'].join(' ')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M21.3555 12.2539H3.35547M3.35547 12.2539L8.35547 17.2539M3.35547 12.2539L8.35547 7.25391" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div
                                ref={navigationNextRef}
                                className={[cl.slideNext, 'arrow__next'].join(' ')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M3.35547 12.2539L21.3555 12.2539M21.3555 12.2539L16.3555 7.25391M21.3555 12.2539L16.3555 17.2539" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CollectionsBlock;