import React, { useContext, useState } from 'react';
import authPageStyles from '../styles/Auth.module.css';
import Button from '../components/Button';
import Input from '../components/Input/Input';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '..';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const Auth = observer(() => {
    const { userStore } = useContext(ContextMain);
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const clickHandler = async () => {
        try {
            userStore.login(email, password)

        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className={authPageStyles.page_auth_wrapper}>
            <div className="container">
                <div className={authPageStyles.page_auth_holder}>
                    <h2 className={authPageStyles.page_title}>Авторизация</h2>
                    <div className={authPageStyles.auth_holder}>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="example@email.ru"
                            required />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Пароль"
                            required />
                        <Button onClick={clickHandler}>Вход</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;