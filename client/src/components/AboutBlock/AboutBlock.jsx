import {observer} from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {ContextMain} from '../..';
import cl from './AboutBlock.module.scss';
import Fancybox from '../Fancybox';
import Container from "../Container/Container";
import clsx from "clsx";
import {useFetchAbout} from "../../hooks/useFetchAbout";

const AboutBlock = observer(() => {
	
	const {about} = useContext(ContextMain);
	const [hidden, setHidden] = useState(true);
	
	useFetchAbout();
	
	if(!about.image || !about.desc) {
		return null;
	}
	
	return (
		<div id="about__block" className={cl.aboutBlock}>
			<Container>
				<h2 className={cl.blockTitle}>О проекте</h2>
				<div className={cl.aboutHolder}>
					{about?.image?.file_path &&
						<Fancybox className={cl.leftSide}>
							<img
								src={about?.image.file_path}
								data-src={about?.image?.file_path}
								data-fancybox="imageAbout"
								alt={about?.image?.size?.fileName}
								loading="lazy" decoding="async"
							/>
							<span className={cl.leftSide__hover}>
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
						</Fancybox>
					}
					{about.desc &&
						<div className={cl.rightSide}>
							<p
								className={clsx(cl.rightSide__text, hidden && cl.hidden)}
								dangerouslySetInnerHTML={{__html: about?.desc}}>
							</p>
							<button className={cl.rightSide__more} onClick={() => setHidden(!hidden)}>
								{hidden ? "Показать еще" : "Скрыть"}
							</button>
						</div>
					}
				</div>
			</Container>
		</div>
	);
});

export default AboutBlock;