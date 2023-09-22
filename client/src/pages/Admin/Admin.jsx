import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import AdminClasses from './Admin.module.css';
import '../../styles/main.css';
import Basic from '../../components/AdminComponents/basic/Basic';
import { ContextMain } from '../..';

const Admin = observer(() => {
    const { userStore } = useContext(ContextMain);

    if (userStore.isLoading) {
        return <h1>Загрузка...</h1>
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth();
        }
    }, [])

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