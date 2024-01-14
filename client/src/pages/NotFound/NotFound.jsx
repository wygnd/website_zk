import React from 'react';
import cl from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const NotFound = () => {
    return (
        <div className={cl.NotFoundHolder}>
            <div className='container'>
            <Breadcrumbs />
                <div className={cl.errorHolder}>
                    <div className={cl.holderTop}>404</div>
                    <div className={cl.holderBottom}>
                        <div className={cl.nameBottom}>Ой! Что то пошло не так. Вернитесь на главную страницу</div>
                        <div className={cl.descBottom}>Данная страница находится в разработке или её не существует. Пожалуйста, вернитесь на главную</div>
                        <Link to={MAIN_ROUTE} className={cl.linkBottom}>
                            <Button>
                                Вернуться на главную
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;