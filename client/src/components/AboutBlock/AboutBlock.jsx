import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextMain } from '../..';
import cl from './AboutBlock.module.scss';
import Fancybox from '../Fancybox';
import { AiOutlineEye } from 'react-icons/ai';

const AboutBlock = observer(() => {

    const { about } = useContext(ContextMain);

    return (
        <div id="about__block" className={cl.aboutBlock}>
            <div className="container">
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
                                <AiOutlineEye size={40} color='white' />
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
            </div>
        </div>
    );
});

export default AboutBlock;