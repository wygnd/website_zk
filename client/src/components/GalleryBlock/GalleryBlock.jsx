import {observer} from "mobx-react-lite";
import React, {useContext, useRef} from "react";
import cl from "./GalleryBlock.module.scss";
import {ContextMain} from "../..";
import "swiper/css";
import "swiper/css/navigation";
import Fancybox from "../Fancybox";
import Container from "../Container/Container";
import {useFetchGalleryBlock} from "../../hooks/useFetchGalleryBlock";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";

const GalleryBlock = observer(() => {
	
	useFetchGalleryBlock();
	
	const {galleryBlock} = useContext(ContextMain);
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);
	
	if(!galleryBlock?.images) {
		return;
	}
	
	return (
		<div id="gallery__block" className={cl.galleryBlock}>
			<Container>
				<div className={cl.galleryBlock__title_holder}>
					<h2 className={cl.blockTitle}>Галерея</h2>
					<div className={cl.galleryBlock__title_sliderTheme}>
						<div
							ref={navigationPrevRef}
							className={[cl.slidePrev, "arrow__prev"].join(" ")}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="25"
								viewBox="0 0 24 25"
								fill="none"
							>
								<path
									d="M21 12.6589H3M3 12.6589L8 17.6589M3 12.6589L8 7.65894"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div
							ref={navigationNextRef}
							className={[cl.slideNext, "arrow__next"].join(" ")}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="25"
								viewBox="0 0 24 25"
								fill="none"
							>
								<path
									d="M3 12.6589L21 12.6589M21 12.6589L16 7.65894M21 12.6589L16 17.6589"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				</div>
				
				<Fancybox options={{
					Carousel: {
						infinite: false,
					},
				}} className={cl.blockHolder}>
					<Swiper
						modules={[Navigation]}
						lazy="true"
						speed="800"
						className={[cl.swiperGalleryBlock, "swiperGalleryBlock"].join(" ")}
						navigation={{
							nextEl: "#gallery__block .arrow__next",
							prevEl: "#gallery__block .arrow__prev",
							disabledClass: ".swiper-button-disabled",
						}}
						breakpoints={{
							0: {
								slidesPerView: 1,
								spaceBetween: 10,
							},
							700: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 30,
							},
						}}
					>
						{galleryBlock.images.map(
							(item) =>
								item?.file_path && (
									<SwiperSlide className={cl.swiperSlide} key={item.id}>
										<a
											href={item?.file_path_full}
											data-fancybox="galleryBlock"
											className={cl.imageItem}
										>
											<img
												src={item?.file_path}
												alt={item?.file_name}
												className="swiper-lazy"
											/>
											<span className={cl.imageItem__hover}>
														<svg width="35" height="35" viewBox="0 0 35 35" fill="none"
														     xmlns="http://www.w3.org/2000/svg">
															<path
																d="M30.367 17.2C30.367 18.9 24.7003 25.7 17.617 25.7C10.5337 25.7 4.867 18.9 4.867 17.2C4.867 15.5 10.5337 8.70001 17.617 8.70001C24.7003 8.70001 30.367 15.5 30.367 17.2Z"
																stroke="white" strokeWidth="2"/>
															<path
																d="M21.867 17.2C21.867 18.3272 21.4192 19.4082 20.6222 20.2052C19.8252 21.0022 18.7442 21.45 17.617 21.45C16.4898 21.45 15.4088 21.0022 14.6118 20.2052C13.8148 19.4082 13.367 18.3272 13.367 17.2C13.367 16.0728 13.8148 14.9918 14.6118 14.1948C15.4088 13.3978 16.4898 12.95 17.617 12.95C18.7442 12.95 19.8252 13.3978 20.6222 14.1948C21.4192 14.9918 21.867 16.0728 21.867 17.2Z"
																stroke="white" strokeWidth="2"/>
														</svg>
													</span>
										</a>
									</SwiperSlide>
								)
						)}
					</Swiper>
				</Fancybox>
			</Container>
		</div>
	);
});

export default GalleryBlock;
