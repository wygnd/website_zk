/* eslint-disable jsx-a11y/alt-text */
import React, {useContext, useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import {observer} from "mobx-react-lite";
import cl from "./MainBlock.module.scss";
import "swiper/css";
import {ContextMain} from "../..";
import {createFilePath} from "../../http/galleryAPI";
import Container from "../Container/Container";
import {fetchSlides} from "../../http/mainBlockAPI";

const MainBlock = observer(() => {
	const {mainBlockStore} = useContext(ContextMain);
	const [swiperMainBlock, setSwiperMainBlock] = useState({});
	// const [slides, setSlides] = useState([]);
	
	useEffect(() => {
		if(mainBlockStore.slides.length === 0) {
			fetchSlides().then((data) => {
				if(data.length === 0) {
					mainBlockStore.setSlides([]);
					return false;
				}
				mainBlockStore.setSlides(data);
			});
		}
	}, [mainBlockStore.slides]);
	
	if(mainBlockStore.slides.length === 0) {
		return;
	}
	
	return (
		<section className={cl.mainBlock}>
			<Swiper
				speed={1000}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
					stopOnLastSlide: true,
				}}
				onSwiper={(swiper) => {
					setSwiperMainBlock(swiper);
				}}
				spaceBetween={1}
				loop={true}
				className="swiperMainBlock"
				allowTouchMove={false}
				navigation={{
					nextEl: ".arrow__next",
					prevEl: ".arrow__prev",
					disabledClass: ".swiper-button-disabled",
				}}
				modules={[Autoplay, Navigation]}
			>
				{mainBlockStore?.slides?.map(
					(slide) => {
						const {file_name, file_ext} = slide?.gallery;
						const file_path_full = createFilePath(file_name, file_ext, "full");
						const file_path_medium = createFilePath(file_name, file_ext, 'large');
						return file_path_full &&
							<SwiperSlide key={slide.id}>
								<div className={cl.mainItem}>
									<Container>
										<div className={cl.itemHolder}>
											<div className={cl.titleItem}>{slide.title}</div>
											<div className={cl.descItem}>{slide.desc}</div>
											{slide.buttonVisible && (
												<a
													href={slide.linkButton}
													className={cl.linkItem}
													target="_blank"
													rel="noreferrer"
												>
													{slide.textButton}
												</a>
											)}
										</div>
									</Container>
									<div className={cl.imageBackground}>
										<picture>
											<source srcSet={file_path_medium} media="(max-width: 992px)"/>
											<img src={file_path_full} loading="lazy" alt={file_name}/>
										</picture>
									</div>
								</div>
							</SwiperSlide>
					}
				)}
			</Swiper>
			{!swiperMainBlock.isLocked && (
				<div className={cl.sliderTheme}>
					<div className={[cl.slidePrev, "arrow__prev"].join(" ")}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
						>
							<path
								d="M35 20H5M5 20L13.3333 28.3334M5 20L13.3333 11.6667"
								stroke="#0A1C27"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className={[cl.slideNext, "arrow__next"].join(" ")}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
						>
							<path
								d="M5 20L35 20M35 20L26.6667 11.6666M35 20L26.6667 28.3333"
								stroke="#0A1C27"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			)}
		</section>
	);
});

export default MainBlock;
