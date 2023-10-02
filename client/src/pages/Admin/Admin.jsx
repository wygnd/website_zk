import React from 'react';
import { observer } from 'mobx-react-lite'
import AdminClasses from './Admin.module.css';
import '../../styles/main.css';
import Basic from '../../components/AdminComponents/basic/Basic';
import Main from '../../components/AdminComponents/Main/Main';
import Tour from '../../components/AdminComponents/Tour/Tour';

const Admin = observer(() => {

    return (
        <div className='container extend'>
            <h1 className={AdminClasses.page__title}>Панель администратора</h1>
            <div className={AdminClasses.admin__holder}>
                <Basic className={AdminClasses.admin__item} />
                <Main className={AdminClasses.admin__item} />
                <Tour className={AdminClasses.admin__item} />
            </div>
        </div>
    );
});

export default Admin;