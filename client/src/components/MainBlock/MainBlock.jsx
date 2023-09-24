import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { observer } from 'mobx-react-lite';
import cl from './MainBlock.module.css';

import 'swiper/css';

import { fetchSlides } from '../../http/mainBlockAPI';
import { SERVER_URL } from '../../utils/consts';
import { ContextMain } from '../..';

const MainBlock = observer(() => {

    const { mainBlockStore } = useContext(ContextMain);

    if (mainBlockStore.slides.length === 0) {
        return;
    }

    return (
        <section className={cl.mainBlock}>
            <Swiper
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="swiperMainBlock"
                allowTouchMove={false}
                navigation={{
                    nextEl: ".arrow__next",
                    prevEl: ".arrow__prev",
                    disabledClass: ".swiper-button-disabled"
                }}
                modules={[Autoplay, Navigation]}

            >
                {mainBlockStore.slides.map(slide =>
                    <SwiperSlide key={slide.id}>
                        <div className={cl.mainItem}>
                            <div className="container">
                                <div className={cl.itemHolder}>
                                    <div className={cl.titleItem}>{slide.title}</div>
                                    <div className={cl.descItem}>{slide.desc}</div>
                                    {slide.buttonVisible &&
                                        <a href={slide.linkButton} className={cl.linkItem} target='_blank'>В бутылочку</a>
                                    }
                                </div>
                            </div>
                            <div className={cl.imageBackground}>
                                <img src={`${SERVER_URL}/${slide.gallery.fileName}`} />
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className={cl.sliderTheme}>
                <div className={[cl.slidePrev, 'arrow__prev'].join(' ')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M35 20H5M5 20L13.3333 28.3334M5 20L13.3333 11.6667" stroke="#0A1C27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className={[cl.slideNext, 'arrow__next'].join(' ')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M5 20L35 20M35 20L26.6667 11.6666M35 20L26.6667 28.3333" stroke="#0A1C27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    );
});

export default MainBlock;