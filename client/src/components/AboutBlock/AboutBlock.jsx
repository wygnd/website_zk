import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {ContextMain} from '../..';
import cl from './AboutBlock.module.scss';
import Fancybox from '../Fancybox';
import {AiOutlineEye} from 'react-icons/ai';
import Container from "../Container/Container";

const AboutBlock = observer(() => {
	
	const {about} = useContext(ContextMain);
	
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
							/>
							<div className={cl.hoverImage}>
								<AiOutlineEye size={40} color='white'/>
								Посмотреть
							</div>
						</Fancybox>
					}
					{about.desc &&
						<div className={cl.rightSide}>
							<p
								dangerouslySetInnerHTML={{__html: about?.desc}}>
							</p>
						</div>
					}
				</div>
			</Container>
		</div>
	);
});

export default AboutBlock;