import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import cl from './GalleryBlock.module.css';
import { ContextMain } from '../..';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SERVER_URL } from '../../utils/consts';
import Fancybox from '../Fancybox';
import { AiOutlineEye } from 'react-icons/ai';


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
                <Fancybox
                    options={{
                        Carousel: {
                            infinite: false,
                        },
                    }}
                    className={cl.blockHolder}
                >
                    <Swiper
                        modules={[Navigation, A11y]}
                        onSwiper={(swiper) => {
                            setSwiperGalleryBlock(swiper);
                        }}
                        centeredSlides={true}
                        loop={true}
                        lazy={true.toString()}
                        speed={600}
                        className={[cl.swiperGalleryBlock, 'swiperGalleryBlock'].join(' ')}
                        slidesPerView={3}
                        spaceBetween={30}
                        navigation={{
                            nextEl: "#gallery__block .arrow__next",
                            prevEl: "#gallery__block .arrow__prev",
                            disabledClass: ".swiper-button-disabled"
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            700: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                                centeredSlides: false,
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                                centeredSlides: true,
                            },
                        }}
                    >
                        {galleryBlock.images.map(item =>
                            <SwiperSlide
                                className={cl.swiperSlide}
                                key={item.id}
                            >
                                <a
                                    href={`${SERVER_URL}/${item.size.full}`}
                                    data-fancybox="galleryBlock"
                                    className={cl.imageItem}
                                >
                                    <img
                                        src={`${SERVER_URL}/${item.size.medium}`}
                                        alt={item.size.fileName}
                                        className='swiper-lazy'
                                    />
                                    <div className={cl.hoverImage}>
                                        <AiOutlineEye size={80} color='white' />
                                        Посмотреть
                                    </div>
                                </a>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <div className={cl.sliderTheme}>
                        <div ref={navigationPrevRef} className={[cl.slidePrev, 'arrow__prev'].join(' ')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M21 12.6589H3M3 12.6589L8 17.6589M3 12.6589L8 7.65894" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div ref={navigationNextRef} className={[cl.slideNext, 'arrow__next'].join(' ')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M3 12.6589L21 12.6589M21 12.6589L16 7.65894M21 12.6589L16 17.6589" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </Fancybox>
            </div>

        </div>
    );
});

export default GalleryBlock;