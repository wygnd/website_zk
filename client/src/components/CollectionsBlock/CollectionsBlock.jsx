import {observer} from "mobx-react-lite";
import React, {useContext, useRef, useState} from "react";
import cl from "./CollectionsBlock.module.scss";
import {ContextMain} from "../..";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import Fancybox from "../Fancybox";
import "swiper/css";
import "swiper/css/navigation";
import Container from "../Container/Container";
import {useFetchCollections} from "../../hooks/useFetchCollections";

const CollectionsBlock = observer(() => {
	const {collections} = useContext(ContextMain);
	
	useFetchCollections();
	
	if(!collections?.desc && !collections?.gallery) {
		return null;
	}
	
	const [swiperCollections, setSwiperCollections] = useState({});
	const [hidden, setHidden] = useState(false);
	const [textBtn, setTextBtn] = useState('Показать еще');
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);
	
	const handlerButton = () => {
		setHidden(!hidden);
		if(textBtn === "Показать еще") {
			setTextBtn("Скрыть");
		} else {
			setTextBtn("Показать еще")
		}
	}
	
	return (
		<div id="collections__block" className={cl.collectionsBlock}>
			<Container>
				<h2 className={cl.blockTitle}>Бар музей</h2>
				<div className={cl.collectionsHolder}>
					{collections?.desc && (
						<div className={cl.leftSide}>
							<p className={`${hidden ? cl.desc : cl.desc + ' ' + cl.desc_hidden}`}
							   dangerouslySetInnerHTML={{__html: collections?.desc?.metaValue}}
							>
							</p>
							<button className={cl.button_more} onClick={handlerButton}>{textBtn}</button>
						</div>
					)}
					<div className={cl.rightSide}>
						{collections?.gallery && (
							<Fancybox
								options={{
									animated: true,
									Carousel: {
										infinite: false,
									},
								}}
							>
								<Swiper
									modules={[Navigation]}
									onSwiper={(swiper) => {
										setSwiperCollections(swiper);
									}}
									lazy={true.toString()}
									speed={800}
									className={cl.swiperCollectionsBlock}
									spaceBetween={30}
									navigation={{
										prevEl: navigationPrevRef.current,
										nextEl: navigationNextRef.current,
										disabledClass: cl.swiperDisabled,
									}}
									onBeforeInit={(swiper) => {
										swiper.params.navigation.prevEl = navigationPrevRef.current;
										swiper.params.navigation.nextEl = navigationNextRef.current;
									}}
								>
									{collections.gallery.map(
										(item) =>
											<SwiperSlide key={item.uuId}>
												<a
													data-fancybox="galleryCollections"
													href={item?.file_path}
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
									)}
								</Swiper>
							</Fancybox>
						)}
						{swiperCollections && (
							<div className={cl.sliderTheme}>
								<div ref={navigationPrevRef} className={cl.slidePrev}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										viewBox="0 0 25 25"
										fill="none"
									>
										<path
											d="M21.3555 12.2539H3.35547M3.35547 12.2539L8.35547 17.2539M3.35547 12.2539L8.35547 7.25391"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div ref={navigationNextRef} className={cl.slideNext}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										viewBox="0 0 25 25"
										fill="none"
									>
										<path
											d="M3.35547 12.2539L21.3555 12.2539M21.3555 12.2539L16.3555 7.25391M21.3555 12.2539L16.3555 17.2539"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</div>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
});

export default CollectionsBlock;
