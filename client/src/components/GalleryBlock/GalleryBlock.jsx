import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import cl from './GalleryBlock.module.css';
import { ContextMain } from '../..';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SERVER_URL } from '../../utils/consts';
import Fancybox from '../Fancybox';


const GalleryBlock = observer(() => {

    const { galleryBlock } = useContext(ContextMain);
    const [swiperGalleryBlock, setSwiperGalleryBlock] = useState({});
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);

    if (!galleryBlock.images) {
        return;
    }

    return (
        <div id="gallery__block" className={cl.galleryBlock}>
            <div className="container">
                <h2 className={cl.blockTitle}>Галерея</h2>
                <div className={cl.blockHolder}>
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={(swiper) => {
                            setSwiperGalleryBlock(swiper);
                        }}
                        lazy={true.toString()}
                        speed={800}
                        className={cl.swiperGalleryBlock}
                        slidesPerView={3}
                        spaceBetween={30}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                            disabledClass: cl.swiperDisabled
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                        }}
                    >
                        {galleryBlock.images.map(item =>
                            <SwiperSlide key={item.uuId}>
                                <Fancybox className={cl.imageItem}>
                                    <img
                                        src={`${SERVER_URL}/${item.size.medium}`}
                                        alt={item.size.fileName}
                                        data-src={`${SERVER_URL}/${item.size.full}`}
                                        data-fancybox="gallerygalleryBlock"
                                        className='swiper-lazy'
                                    />
                                    {/* <div className={cl.hoverImage}>
                                                <AiOutlineEye size={80} color='white' />
                                                Посмотреть
                                            </div> */}
                                </Fancybox>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>

        </div>
    );
});

export default GalleryBlock;