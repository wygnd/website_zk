import React, { useContext, useState } from 'react';
import authPageStyles from '../styles/Auth.module.css';
import Button from '../components/Button';
import Input from '../components/Input/Input';
import { login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '..';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, MAIN_ROUTE } from '../utils/consts';

const Auth = observer(() => {
    const { user } = useContext(ContextMain);
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const singIn = async () => {
        try {
            let data;
            data = await login(email, password);
            console.log(data);
            user.setUser(data);
            user.setIsAuth(true);
            history(MAIN_ROUTE);
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
                        <Button onClick={singIn}>Вход</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;