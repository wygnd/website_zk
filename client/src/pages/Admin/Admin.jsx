import React from 'react';
import { observer } from 'mobx-react-lite'
import AdminClasses from './Admin.module.css';
import '../../styles/main.css';

const Admin = observer(() => {

    return (
        <div className='container'>
            <h1 className={AdminClasses.page__title}>Панель администратора</h1>
            <div className={AdminClasses.admin__holder}>
                <div className={AdminClasses.admin__side}>
                    <div className={AdminClasses.logo__holder}>
                        
                    </div>
                </div>
                <div className={AdminClasses.admin__bar}>

                </div>
            </div>
        </div>
    );
});

export default Admin;