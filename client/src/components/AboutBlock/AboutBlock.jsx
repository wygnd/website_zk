import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextMain } from '../..';
import cl from './AboutBlock.module.css';
import { SERVER_URL } from '../../utils/consts';
import Fancybox from '../Fancybox';
import { AiOutlineEye } from 'react-icons/ai';

const AboutBlock = observer(() => {

    const { about } = useContext(ContextMain);

    return (
        <div id="about__block" className={cl.aboutBlock}>
            <div className="container">
                <h2 className={cl.blockTitle}>О проекте</h2>
                <div className={cl.aboutHolder}>
                    {about.image.size &&
                        <Fancybox className={cl.leftSide}>
                            <img
                                src={`${SERVER_URL}/${about?.image?.size?.full}`}
                                data-src={`${SERVER_URL}/${about?.image?.size?.full}`}
                                data-fancybox="imageAbout"
                                alt={about?.image?.size?.fileName}
                            />
                            <div className={cl.hoverImage}>
                                <AiOutlineEye size={80} color='white' />
                                Посмотреть
                            </div>
                        </Fancybox>
                    }
                    {about.desc &&
                        <div className={cl.rightSide}>
                            <p>{about.desc}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default AboutBlock;