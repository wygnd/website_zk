import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useRef, useState} from "react";
import cl from "./CollectionsBlock.module.scss";
import {ContextMain} from "../..";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {SERVER_URL} from "../../utils/consts";
import Fancybox from "../Fancybox";
import {AiOutlineEye} from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";

const CollectionsBlock = observer(() => {
	const {collections} = useContext(ContextMain);
	const [swiperCollections, setSwiperCollections] = useState({});
	const [hidden, setHidden] = useState(false);
	const [textBtn, setTextBtn] = useState('Показать еще');
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);

	const handlerButton = (e) => {
		setHidden(!hidden);
		if(textBtn === "Показать еще") {
			setTextBtn("Скрыть");
		} else {
			setTextBtn("Показать еще")
		}
	}

	return (
		<div id="collections__block" className={cl.collectionsBlock}>
			<div className="container">
				<h2 className={cl.blockTitle}>Коллекция</h2>
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
						{collections.gallery && (
							<Fancybox
								options={{
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
													<div className={cl.hoverImage}>
														<AiOutlineEye size={40} color="white"/>
														Посмотреть
													</div>
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
			</div>
		</div>
	);
});

export default CollectionsBlock;
