import React from 'react';
import { observer } from 'mobx-react-lite'
import AdminClasses from './Admin.module.css';
import '../../styles/main.css';
import Basic from '../../components/AdminComponents/basic/Basic';

const Admin = observer(() => {

    return (
        <div className='container extend'>
            <h1 className={AdminClasses.page__title}>Панель администратора</h1>
            <div className={AdminClasses.admin__holder}>
                <Basic />
            </div>
        </div>
    );
});

export default Admin;